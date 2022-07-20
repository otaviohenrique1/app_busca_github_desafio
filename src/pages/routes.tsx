import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  );
}