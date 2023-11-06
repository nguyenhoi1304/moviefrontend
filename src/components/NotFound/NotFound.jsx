import React from "react";
import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes.notFoundContainer}>
      <h1>This Page not found</h1>
      <h3>Error 404!</h3>
    </div>
  );
};

export default NotFound;
