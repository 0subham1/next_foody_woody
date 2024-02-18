"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const localUserInfo = localStorage.getItem("userInfo");
  console.log(localUserInfo, "localUserInfo");

  const router: any = useRouter();
  const pathName = usePathname();

  let adminRoutes = [
    {
      path: "/items",
      name: "Items",
    },
    {
      path: "/orders",
      name: "Orders",
    },
    {
      path: "/users",
      name: "Users",
    },
  ];

  return (
    <div className="flexSpaceBetween card0">
      <Image
        className="pointer"
        src="/logo.png"
        alt=""
        height={50}
        width={50}
        onClick={() => router.push("/")}
      />
      <div className="flexGap">
        {adminRoutes?.map((a) => {
          return (
            <Link
              href={a.path} //without state
              // href={{
              //   pathname: a.path,
              //   query: { state: "hello" },
              // }}
              className={pathName?.includes(a.path) ? "active" : ""}
            >
              {a.name}
            </Link>
          );
        })}
        {localUserInfo ? (
          <>
            <div>Profile</div> <div>Logout</div>
          </>
        ) : (
          <div className="pointer" onClick={() => router.push("/login")}>
            Login
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
