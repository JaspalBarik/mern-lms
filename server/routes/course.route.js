import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, getCourseById, editCourse, getCreatorCourses, getCourseLecture, editLecture, removeLecture, getLectureById, togglePublishCourse, getPublishedCourse} from "../controllers/course.controller.js";
import upload from "../utils/multer.js";
import { searchCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(isAuthenticated, searchCourse);
router.route("/published-courses").get(getPublishedCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/:courseId").put(isAuthenticated, upload.single("courseThumbnail"), editCourse);
router.route("/public/:courseId").get(getCourseById); // NO need of Auth
router.route("/creator/:courseId").get(isAuthenticated, getCourseById); // Needs Auth.
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);


export default router;