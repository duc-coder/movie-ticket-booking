import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userRoutes } from './routes/userRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {userRoutes.map((route, index) => {
          if (route.exact) {
            return (
              <Route
                key={index}
                path={route.path}
                element={route.component}
              />
            )
          } else {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            )
          }
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
