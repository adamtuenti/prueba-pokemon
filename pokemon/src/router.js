import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/home/home'
import Error from './components/error/error'


const Router = () => {


  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
  );
};

export default Router;
