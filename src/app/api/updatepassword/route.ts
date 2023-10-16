import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/userModels";

interface UserData {
  name: string;
  email: string;
  id: string;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session) {
      const body = await req.json();
      const { oldpassword, newpassword } = body;
      
      const user = await User.findOne({ email: session.user?.email });
      
      if (user) {
        const passwordMatch = await bcrypt.compare(oldpassword, user.password);
        
        if (passwordMatch) {
          const hashPassword = await bcrypt.hash(newpassword, 10);
          
          const updatedUser = await User.findByIdAndUpdate(
            (session.user as UserData).id,
            {
              password: hashPassword,
            },
            { new: true }
          );
          
          return NextResponse.json({ msg: "change password success" }, { status: 200 });
        } else {
          return NextResponse.json({ msg: "password didn't match" }, { status: 401 });
        }
      } else {
        return NextResponse.json({ msg: "User not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ msg: "Not logged in" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ msg: "An error occurred" }, { status: 500 });
  }
}
