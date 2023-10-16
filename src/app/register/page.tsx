import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import RegisterContainer from "@/container/register/page";

const Register = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  return (
    <div>
      <RegisterContainer />
    </div>
  );
};

export default Register;
