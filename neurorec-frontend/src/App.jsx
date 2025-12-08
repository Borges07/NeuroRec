import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { AdminRoute } from "./components/AdminRoute.jsx";
import { Chat } from "./pages/Chat/Chat.jsx";
import { CourseDetail } from "./pages/CourseDetail/CourseDetail.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { MyCourses } from "./pages/MyCourses/MyCourses.jsx";
import { AdminCoursesList } from "./pages/Admin/Courses/AdminCoursesList.jsx";
import { AdminCourseForm } from "./pages/Admin/Courses/AdminCourseForm.jsx";
import { Login } from "./pages/Login/Login.jsx";
import { Register } from "./pages/Register/Register.jsx";
import { Courses } from "./pages/Courses/Courses.jsx";
import { Cart } from "./pages/Cart/Cart.jsx";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="courses/:courseId" element={<CourseDetail />} />
        <Route element={<AdminRoute />}>
          <Route path="admin/courses" element={<AdminCoursesList />} />
          <Route path="admin/courses/new" element={<AdminCourseForm />} />
          <Route path="admin/courses/:courseId/edit" element={<AdminCourseForm />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="chat" element={<Chat />} />
          <Route path="cart" element={<Cart />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="courses" element={<Courses />} />
        </Route>
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
