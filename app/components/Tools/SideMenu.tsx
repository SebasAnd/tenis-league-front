"use client";
import NavBar from "./NavBar";
import NavButton from "../NavButton";
import UserPanel from "./UserPanel";
import AuthProvider from "@/app/context/AuthProvider";

type User =
  | {
      name?: string | null | undefined;
      email?: string | null | undefined;
      is_admin?: boolean | null | undefined;
      image?: string | null | undefined;
    }
  | undefined;
interface Props {
  childrenMenu: React.ReactNode;
  user: User;
}

const SideMenu = async ({ childrenMenu, user }: Props) => {
  const pathname = "";
  const usersAccess =
    user?.image === "true" ? (
      <>
        <li>
          <NavButton name="Users" link="users" />
        </li>
      </>
    ) : null;
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <NavBar
          menuButton={
            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn btn-primary"
            ></label>
          }
        />
        <AuthProvider>{childrenMenu}</AuthProvider>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <UserPanel user={user} page="/" />
          <li>
            <NavButton name="Home" link="" />
          </li>
          {usersAccess}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
function refreshData() {
  throw new Error("Function not implemented.");
}
