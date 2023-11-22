"use client";
import Link from "next/link";
import React, { useState } from "react";

type User = {
  name: string;
  email: string;
  is_admin: boolean;
  nickname: string;
  password: string;
};
interface Props {
  user?: User;
  type: string;
  path: string;
  pathFrom: string;
  urlBack: string;
}

const EditInterface = ({ user, type, path, pathFrom, urlBack }: Props) => {
  const [email, setEmail] = useState(user && user.email ? user?.email : "");
  const [password, setPassword] = useState(
    user && user.password ? user?.password : ""
  );
  const [name, setName] = useState(user && user.name ? user?.name : "");
  const [nickname, setNickName] = useState(
    user && user.nickname ? user?.nickname : ""
  );
  const [changeAdmin, setIsAdmin] = useState(
    user && (user.is_admin == true || "" + user.is_admin == "true")
      ? user?.is_admin
      : false
  );

  let interfaceToShow;
  if (type == "edit" && path) {
    interfaceToShow = (
      <div>
        <div className="particularForm">
          Email:{" "}
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          Password:{" "}
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          Name:{" "}
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
            }}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div>
          NickName:{" "}
          <input
            id="nname"
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickName(e.currentTarget.value);
            }}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          Is Admin:
          <input
            id="isadminS"
            type="checkbox"
            value={"" + changeAdmin}
            checked={
              changeAdmin === true || "" + changeAdmin === "true" ? true : false
            }
            onChange={(e) => {
              setIsAdmin(e.currentTarget.value == "true" ? false : true);
              console.log("clicked", !changeAdmin);
            }}
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          <Link
            id="sendLink"
            href={{
              pathname: path,
              query: {
                email: email,
                password: password,
                is_admin: "" + changeAdmin == "true" ? true : false,
                name: name,
                nickname: nickname,
                pathFrom: pathFrom,
                urlBack: urlBack,
              },
            }}
            className="btn btn-primary"
          >
            Save
          </Link>
        </div>
      </div>
    );
  }
  return <div>{interfaceToShow}</div>;
};

export default EditInterface;
