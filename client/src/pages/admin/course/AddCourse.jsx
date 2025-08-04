import { Label } from '@/components/ui/label';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useCreateCourseMutation } from '@/features/api/courseApi';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';


  const AddCourse = () => {

    const[courseTitle, setCourseTitle] = useState("");
    const[category, setCategory] = useState("");

    const [createCourse, {data, isLoading, error, isSuccess}] = useCreateCourseMutation();

    const navigate = useNavigate();

    const getSelectedCategory = (value) => {
        setCategory(value);
    }

    const createCourseHandler = async () => {
        await createCourse({courseTitle, category});
    };

    // for displaying toast
    useEffect(()=> {
    if(isSuccess){
      toast.success(data?.message || "Course Created." );
      navigate("/admin/course");
    }
    },[isSuccess, error])

return(
       <div className="flex-1 mx-10">
        <div className="mb-4">
        <h1 className="font-bold text-xl">Let's add course, add some basic course details for your new course</h1>
        <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, iste.</p>
        </div>
        <div className="space-y-4">
            <div>
             <Label>Title</Label>
             <Input type="text" value={courseTitle} onChange={(e)=> setCourseTitle(e.target.value)} placeholder="Your Course Name"  className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded" />
            </div>
              <div>
             <Label>Category</Label>
             <Select onValueChange={getSelectedCategory}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="Next JS">Next JS</SelectItem>
          <SelectItem value="Data Science">Data Science</SelectItem>
          <SelectItem value="React JS">React JS</SelectItem>
          <SelectItem value="Docker">Docker</SelectItem>
          <SelectItem value="MongoDB">MongoDB</SelectItem>
            <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
          <SelectItem value="Spring Boot">Spring Boot</SelectItem>
          <SelectItem value="Kubernet">Kubernet</SelectItem>
          <SelectItem value="Frontend Development">Frontend Development</SelectItem>
          <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
          <SelectItem value="Git and Github">Git and Github</SelectItem>
          <SelectItem value="Backend Development">Backend Development</SelectItem>
          <SelectItem value="HTML and CSS">HTML and CSS</SelectItem>
          <SelectItem value="JavaScript">JavaScript</SelectItem>
          <SelectItem value="MySql DB">MySql DB</SelectItem>
        </SelectGroup>
      </SelectContent>
     </Select>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={()=>navigate("/admin/course")}>Back</Button>
             <Button disabled={isLoading} onClick={createCourseHandler}>
                {
                    isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please Wait.
                        </>
                    ) : "Create"
                }
             </Button>
        </div>
        </div>
        </div>
       );
    };

export default AddCourse;