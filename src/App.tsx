import React, { useState } from "react";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import FullPizza from "./pages/FullPizza";
import Cart from "./pages/Cart";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import MyLayout from "./layout/MyLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MyLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
