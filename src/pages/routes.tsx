import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./HomePage";
import { HomePage2 } from "./HomePage2";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/HomePage2" element={<HomePage2/>} />
      </Routes>
    </BrowserRouter>
  );
}