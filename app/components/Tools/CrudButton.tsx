"use client";
import Link from "next/link";
import React from "react";

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  is_admin?: boolean | null | undefined;
  password?: string | null | undefined;
  nickname?: string | null | undefined;
};
interface Props {
  color?: string;
  path?: string;
  user?: User;
  buttonName: string;
  pathFrom: string;
  urlBack: string;
}
const CrudButton = ({
  color,
  path,
  user,
  buttonName,
  pathFrom,
  urlBack,
}: Props) => {
  return (
    <Link
      className={"btn " + color}
      href={{
        pathname: path,
        query: {
          email: user?.email,
          password: user?.password,
          is_admin: user?.is_admin,
          name: user?.name,
          nickname: user?.nickname,
          pathFrom: pathFrom,
          urlBack: urlBack,
        },
      }}
    >
      {buttonName}
    </Link>
  );
};

export default CrudButton;
