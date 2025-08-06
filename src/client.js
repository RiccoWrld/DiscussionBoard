import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jbfiojfrsdbakjwnnhgr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZmlvamZyc2RiYWtqd25uaGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTQzMzAsImV4cCI6MjA2ODg5MDMzMH0.a_G72JgrY15hQcl_UhfX4Z2yYM81DKHbj5FUPQRddVc";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import "./styles.css";
