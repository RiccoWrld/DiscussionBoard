import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import CreatePost from "./components/CreatePost.jsx";
import EditPost from "./components/EditPost.jsx";

import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="post/:id" element={<PostDetail />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
