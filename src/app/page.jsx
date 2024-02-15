"use client";
import React, { useEffect } from "react";

const page = () => {
  useEffect(() => {
    localStorage.setItem("key", 123);
  }, []);

  console.log("subhammmmmmmm");
  return <div>page</div>;
};

export default page;
