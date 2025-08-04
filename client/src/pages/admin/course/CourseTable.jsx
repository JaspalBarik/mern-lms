import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CourseTable = () => {
  const { data, isLoading, error } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Failed to load courses</h1>;

  const courses = data?.courses || [];

  return (
    <div className="p-4">
      <Button onClick={() => navigate("create")}>Create a new Course</Button>

      <Table className="mt-4">
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell className="font-medium">
                  {course?.coursePrice || "NA"}
                </TableCell>
                <TableCell>
                  <Badge>{course.isPublished ? "Published" : "Draft"}</Badge>
                </TableCell>
                <TableCell>{course.courseTitle}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`${course._id}`)}
                  >
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                No courses found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
