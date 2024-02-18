"use client";
import React from "react";
import {
  useRouter,
  useSearchParams,
} from "../../../../node_modules/next/navigation";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(router, "router");
  console.log(searchParams, "searchParams");
  return <div>Login</div>;
};

export default Login;
