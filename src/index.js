import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Particles from "./components/Particles";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <Particles
        particleColors={["#9b2efa", "#9b2efa"]}
        particleCount={1000}
        particleSpread={30}
        speed={1.2}
        particleBaseSize={1000}
        moveParticlesOnHover={false}
        alphaParticles={true}
        disableRotation={true}
      />
      <BrowserRouter>
        <App />
        
      </BrowserRouter>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
