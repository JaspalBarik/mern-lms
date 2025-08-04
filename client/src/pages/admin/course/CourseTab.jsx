import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/RichTextEditor";
import {
  Select, SelectContent, SelectGroup, SelectItem,
  SelectLabel, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: null,
  });

  const params = useParams();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdLoading, refetch } = useGetCourseByIdQuery(courseId);

  const[publishCourse, {}] = usePublishCourseMutation();

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course
      setInput({
        courseTitle: course.courseTitle || "",
        subTitle: course.subTitle || "",
        description: course.description || "",
        category: course.category || "",
        courseLevel: course.courseLevel || "",
        coursePrice: course.coursePrice || "",
        courseThumbnail: null,
      });
    }
  }, [courseByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [editCourse, { data, isLoading: mutationLoading, isSuccess, error }] = useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);
    formData.append("courseId", courseId);

    try {
      await editCourse({ formData, courseId });
      console.log("Submitting Course:", input);
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const publishStatusHandler = async (action) => {
         try {
            const response = await publishCourse({courseId, query:action});
            if(response.data){
              refetch();
              toast.success(response.data.message);
            }
         } catch (error) {
              toast.error("Failed to publish or unpublish course.");
         }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated.");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update course.");
    }
  }, [isSuccess, error]);

  if(courseByIdLoading) return <h1>Loading...</h1>

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button disabled={courseByIdData?.course.lectures.length === 0} variant="outline" onClick={()=>publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}>
            {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
          </Button>
          <Button variant="destructive">Remove Course</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle || ""}
              onChange={changeEventHandler}
              placeholder="Ex. React JS Developer"
            />
          </div>

          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle || ""}
              onChange={changeEventHandler}
              placeholder="Ex. Become a MERN stack Developer"
            />
          </div>

          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select onValueChange={selectCategory} value={input.category || ""}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                    <SelectItem value="Fullstack">Fullstack</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML and CSS">HTML and CSS</SelectItem>
                    <SelectItem value="AngularJs">AngularJS</SelectItem>
                    <SelectItem value="VueJS">VueJS</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="ReactJs">ReactJS</SelectItem>
                    <SelectItem value="MERN stack">MERN stack</SelectItem>
                    <SelectItem value="Kubernet">Kubernet</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Course Level</Label>
              <Select onValueChange={selectCourseLevel} value={input.courseLevel || ""}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice || ""}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>

          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img src={previewThumbnail} alt="Thumbnail" className="w-64 mt-2" />
            )}
          </div>

          <div className="space-x-4 mt-4">
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button onClick={updateCourseHandler} disabled={isLoading || mutationLoading}>
              {(isLoading || mutationLoading) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
