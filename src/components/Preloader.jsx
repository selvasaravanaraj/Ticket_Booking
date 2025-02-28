import React, { useEffect } from "react";
import { preLoaderAnim } from "../animations";
import './Preloader.css';

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
        <img src="https://static.vecteezy.com/system/resources/previews/011/098/090/original/natural-traditional-herbal-medicine-3d-icon-illustration-png.png" width="100px" height="100px" />
      <div className="texts-container">
        <span>Natural,</span>
        <span>Safty,</span>
        <span>Good Health.</span>
      </div>
    </div>
  );
};

export default PreLoader;