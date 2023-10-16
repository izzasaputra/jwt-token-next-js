import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(){
  const session = await getServerSession(authOptions)
  if(session){
    return NextResponse.json({msg: "login", session})
  }else{
    return NextResponse.json({msg:"ga login"})
  }
}
