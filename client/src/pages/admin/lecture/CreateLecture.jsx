import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreateLectureMutation, useGetCourseLectureQuery } from "@/features/api/courseApi";
import { useEffect } from "react";
import { toast } from "sonner";
import Lecture from "./Lecture";

    const CreateLecture = () => {
    const[lectureTitle, setLectureTitle] = useState("");   
    const params = useParams();
    const courseId = params.courseId; 
    const navigate = useNavigate();

    const [createLecture, {data, isLoading, isSuccess, error}] = useCreateLectureMutation();

    const {data:lectureData, isLoading:lectureLoading, isError:lectureError, refetch } = useGetCourseLectureQuery(courseId);

    const createLectureHandler = async () => {
        await createLecture({lectureTitle, courseId});
    }

    useEffect(() => {
         if(isSuccess){
            refetch();
            toast.success(data.message);
         }
         if(error){
            toast.error(error.data.message);
         }
    },[isSuccess, error])
    console.log(lectureData);

  return(
     <div className="flex-1 mx-10">
            <div className="mb-4">
            <h1 className="font-bold text-xl">Let's add lectures, add some basic details for your new lecture</h1>
            <p className="text-sm"> Provide essential details like the title and description for your lecture. Clear information helps learners follow along and stay engaged.</p>
            </div>
            <div className="space-y-4">
                <div>
                 <Label>Title</Label>
                 <Input type="text" value={lectureTitle} onChange={(e)=> setLectureTitle(e.target.value)} placeholder="Your Course title name"  className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded" />
                </div>
                
            <div className="flex items-center gap-2">
                <Button variant="outline" onClick={()=>navigate(`/admin/course/${courseId}`)}>Back to Course</Button>
                 <Button disabled={isLoading} onClick={createLectureHandler} >
                    {
                        isLoading ? (
                            <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please Wait.
                            </>
                        ) : (
                        "Create Lecture"
                        )
                    }
                 </Button>
            </div>
            <div className="mt-10">               
                { lectureLoading ? ( 
                <p>Loading Lectures...</p>
              ) : lectureError ? (
              <p>Failed to load Lectures... </p>
              ) : lectureData.lectures.length === 0 ? (
             <p>No Lectures avilable</p>
               ) : (
                lectureData.lectures.map((lecture, index) => (
                 <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index} />
                ))
               )
                }
        </div>
        </div>
        </div>
     )
  }

export default CreateLecture;