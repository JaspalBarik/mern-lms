import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";

const Dashboard = () => {
  const { data, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if(isError) return <h1 className="text-red-500">Failed to get purchased course.</h1>

  // const {purchasedCourse} = data || [];
  const purchasedCourse = data?.purchasedCourse || [];  // changed this 
  
  const courseData = purchasedCourse.map((course) => ({
    name: course.courseId.courseTitle,
    price: course.courseId.coursePrice
  }))

  const totalRevenue = purchasedCourse.reduce((acc, element) => acc+(element.amount || 0 ), 0);

  const totalSales = purchasedCourse.length;
 
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      <Card className="rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl bg-white">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-lg font-semibold text-gray-800">
             🛒 Total Sales
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <p className="text-3xl font-bold text-green-600">{totalSales}</p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl bg-white">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-lg font-semibold text-gray-800">
            💰 Total Revenue
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <p className="text-3xl font-bold text-blue-600">₹{totalRevenue}</p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl bg-white col-span-1 md:col-span-3">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-lg font-semibold text-gray-800">
            📊 Course Price Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {courseData.length === 0 ? (
            <p className="text-gray-500">No course data to display.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    borderColor: "#e5e7eb",
                  }}
                  formatter={(value) => [`₹${value}`, "Price"]}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ stroke: "#3b82f6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
