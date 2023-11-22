"use server";
import Link from "next/link";
import React from "react";

type Params = {
  searchParams: {
    email?: string;
    name?: string;
    password?: string;
    nickname?: string;
    is_admin?: boolean;
    pathFrom: string;
    path: string;
    urlBack: string;
  };
};

const ResultRequest = async ({ searchParams }: Params) => {
  async function SendRequest(url: string) {
    const res = await fetch(process.env.APP_URL + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: searchParams.email,
        name: searchParams.name,
        is_admin: searchParams.is_admin,
        nickname: searchParams.nickname,
        password: searchParams.password,
      }),
    });
    console.log(res, process.env.APP_URL + url, "PPPPPPP", url);
    const data = await res.json();
    const user = data;
    console.log(data);
    if (data.error) {
      result = (
        <>
          <div>
            <span>ERROR, the user was not created</span>
          </div>
          <div>
            <Link
              className="btn btn-primary"
              href={{
                pathname: searchParams.path,
                query: {
                  email: searchParams.email,
                  password: searchParams.password,
                  is_admin: searchParams.is_admin,
                  name: searchParams.name,
                  nickname: searchParams.nickname,
                  pathFrom: searchParams.pathFrom,
                },
              }}
            >
              Volver
            </Link>
          </div>
        </>
      );
    } else {
      result = (
        <>
          <div>
            <span>User updated successfully! </span>
          </div>
          <div>
            <Link className="btn btn-primary" href={searchParams.pathFrom}>
              Volver
            </Link>
          </div>
        </>
      );
    }
  }
  let result = (
    <div>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
  await SendRequest(searchParams.urlBack);

  return <div>{result}</div>;
};

export default ResultRequest;
