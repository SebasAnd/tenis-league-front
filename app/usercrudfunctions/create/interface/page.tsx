"use server";
import React from "react";
import EditInterface from "./EditInterface";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
type Params = {
  searchParams: {
    url_component?: string;
    urlBack: string;
    pathFrom: string;
    type?: string;
    email?: string;
    name?: string;
    password?: string;
    nickname?: string;
    is_admin?: boolean;
  };
};

const Create = async ({ searchParams }: Params) => {
  console.log(searchParams.is_admin);

  const usertemp = {
    name: searchParams.name ? searchParams.name : "",
    email: searchParams.email ? searchParams.email : "",
    is_admin: searchParams.is_admin ? searchParams.is_admin : false,
    nickname: searchParams.nickname ? searchParams.nickname : "",
    password: searchParams.password ? searchParams.password : "",
  };
  return (
    <div>
      <EditInterface
        path="/usercrudfunctions/create/result"
        type="edit"
        user={usertemp}
        pathFrom={searchParams.pathFrom}
        urlBack={searchParams.urlBack}
      />
    </div>
  );
};

export default Create;
