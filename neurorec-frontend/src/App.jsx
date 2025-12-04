import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { Chat } from "./pages/Chat/Chat.jsx";
import { Home } from "./pages/Home/Home.jsx";
import { Login } from "./pages/Login/Login.jsx";
import { Register } from "./pages/Register/Register.jsx";
import { Courses } from "./pages/Courses/Courses.jsx";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="chat" element={<Chat />} />
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
