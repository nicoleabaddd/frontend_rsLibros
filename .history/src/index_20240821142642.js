import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Exchanges from "./pages/Exchanges";
import Messager from "./pages/Messager";
import ButtonHome from "./pages/ButtonHome";
import Recommendations from "./pages/Recommendations";
import RecommendationsList from "./pages/RecommendationsList";
import Perfil from "./pages/Perfil";
import BookCreate from "./pages/BookCreate";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
          <Route path="login" element={<Login />} />
          <Route path="exchanges" element={<Exchanges />} />
          <Route path="messager" element={<Messager />} />
          <Route path="buttonHome" element={<ButtonHome />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="recommendationsList" element={<RecommendationsList />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="bookCreate" element={<BookCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
