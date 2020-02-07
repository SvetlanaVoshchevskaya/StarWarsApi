import React from "react";
import s from "./Loader.module.css";

const Loader = () => (
  <div className={s.loaderContainer}>
    <p className={s.loader}>LOADING ...</p>
  </div>
);
export default Loader;
