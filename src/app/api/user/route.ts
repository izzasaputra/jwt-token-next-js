import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import connectDB from "@/db/config";
import User from "@/models/userModels";

export async function GET(){
  const session = await getServerSession(authOptions)
  if(session){
    connectDB();
    const user = await User.findOne({email: session?.user?.email});
    return NextResponse.json({msg: "success", user:{name: user.name, email: user.email}}, {status:200})
  }else{
    return NextResponse.json({msg:"failed"})
  }
}
