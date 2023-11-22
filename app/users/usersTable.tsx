import React from "react";
import CrudButton from "../components/Tools/CrudButton";
import Tooltip from "../components/Tools/Tooltip";

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  is_admin?: boolean | null | undefined;
  password?: string | null | undefined;
  nickname?: string | null | undefined;
};
interface Props {
  allUsersData: User[];
}
const UsersTable = ({ allUsersData }: Props) => {
  return (
    <>
      <h1>Users Page</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>NickName</th>
            <th>Admin</th>
            <th>
              <CrudButton
                path="/usercrudfunctions/create/interface"
                pathFrom="/users"
                buttonName="add"
                user={{
                  name: "",
                  email: "",
                  is_admin: false,
                  password: "",
                  nickname: "",
                }}
                color="btn-primary"
                urlBack="/addUser"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {allUsersData.map((aduser) => (
            <tr key={aduser.email}>
              <td>{aduser.name}</td>
              <td>{aduser.email}</td>
              <td>{aduser.nickname}</td>
              <td>
                {aduser.is_admin ? (
                  <Tooltip checked={true} />
                ) : (
                  <Tooltip checked={false} />
                )}
              </td>
              <td>
                <CrudButton
                  path="/usercrudfunctions/create/interface"
                  buttonName="edit"
                  color="btn-success"
                  user={aduser}
                  pathFrom="/users"
                  urlBack="/updateUser"
                />

                <CrudButton
                  path="/usercrudfunctions/create/result"
                  pathFrom="/users"
                  buttonName="delete"
                  color="btn-error"
                  user={aduser}
                  urlBack="/deleteUser"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersTable;
