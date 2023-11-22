import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import NavBar from "./components/Tools/NavBar";
import SideMenu from "./components/Tools/SideMenu";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { googleValidation } from "./googleValidation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options);
  async function CheckGoogleUser() {
    try {
      const res = await fetch(process.env.APP_URL + "/checkUserGoogle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ username: session?.user?.email }),
      });
      const data = await res.json();
      const user = data[0];
      if (user) {
        user["image"] = user.is_admin ? user.is_admin : "false";
        if (session && session.user) {
          session.user.image = "" + user.is_admin;
        }
      }
    } catch (error) {
      return null;
    }
  }

  if (session?.user?.image != undefined && session?.user?.image != null) {
    await CheckGoogleUser();
  }

  //console.log(session?.user);
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <SideMenu
          user={session?.user}
          childrenMenu={<>{children}</>}
        ></SideMenu>
      </body>
    </html>
  );
}
