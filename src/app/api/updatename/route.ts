import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import connectDB from "@/db/config";
import User from "@/models/userModels";
import { useSession } from "next-auth/react";

interface UserData {
  name: string;
  email: string;
  id: string;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (session) {
    connectDB();
    const body = await req.json();
    const { name:newName } = body;
    const updatedUser = await User.findByIdAndUpdate(
      (session.user as UserData).id,
      {
        name: newName,
      },
      { new: true }
    );

    return NextResponse.json({ msg: "update success!" }, { status: 200 });
  } else {
    return NextResponse.json({ msg: "ga login" }, { status: 401 });
  }
}
