import { Routes, Route } from "react-router";

import { Toaster } from "react-hot-toast";

import Homepage from "./components/Homepage";
import CreateProfile from "./components/CreateProfile";
import EditProfile from "./components/EditProfile";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/new" element={<CreateProfile />} />
        <Route path="/:id/edit" element={<EditProfile />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#142a2d",
            color: "#f5ecd9",
            border: "1px solid #d6b37a55",
            fontFamily: "Manrope, sans-serif",
          },
          success: {
            iconTheme: {
              primary: "#86c7ad",
              secondary: "#142a2d",
            },
          },
          error: {
            iconTheme: {
              primary: "#e89a76",
              secondary: "#142a2d",
            },
          },
        }}
      />
    </div>
  );
}
