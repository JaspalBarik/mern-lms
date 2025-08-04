import React from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {

  const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    console.log("Sending courseId:", courseId);
    await createCheckoutSession(courseId); // ✅ fixed: pass just courseId
  }

  useEffect(() => {
    if (isSuccess) {
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Invalid response from server.");
      }
    }

    if (isError) {
      toast.error(error?.data?.message || "Failed to create checkout session.");
    }
  }, [data, isSuccess, isError, error]);

  return (
    <Button disabled={isLoading} onClick={purchaseCourseHandler} className="w-full">
      {
        isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
          </>
        ) : "Purchase Course"
      }
    </Button>
  );
};

export default BuyCourseButton;
