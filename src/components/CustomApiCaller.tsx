"use client";
import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "@/Const";

//    toast.error("Please fill both fields");
export const printHello = (val) => {
  let a = 2 + val;
  return a;
};

export const ApiCallerGet = async (path) => {
  let resp = await axios
    .get(BASE_URL + path)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      toast.error(err);
    });

  return resp;
};

// export const ApiCallerGet = async (path) => {
//   try {
//     let res = await axios.get(BASE_URL + path);
//     console.log(res, "xyz");
//     return res?.data;
//   } catch (err) {
//     toast.error(err);
//   }
// };

//    handleGetResponse(res.data);
export const ApiCallerPost = async (path, data) => {
  try {
    let res = await axios.post(BASE_URL + path, data);
    console.log(res, "xyz");
    return res?.data;
  } catch (err) {
    toast.error(err);
  }
};
export const ApiCallerPut = async (path, data) => {
  try {
    let res = await axios.put(BASE_URL + path, data);
    console.log(res, "xyz");
    toast.success("");

    return res?.data;
  } catch (err) {
    toast.error(err);
  }
};
