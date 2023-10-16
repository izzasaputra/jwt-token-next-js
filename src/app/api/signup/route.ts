import User from "@/models/userModels";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/db/config";

export async function POST(req: Request) {
  try {
    connectDB();
    const body = await req.json();
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json({ msg: "invalid fields" }, { status: 400 });
    }

    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      return NextResponse.json(
        { msg: "user is already present" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, name, password: hashPassword });
    await user.save();
    const response = NextResponse.json(
      { msg: "user successful create" },
      { status: 200 }
    );
    return response;
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
