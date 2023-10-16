import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Dashboard from "@/container/dashboard/page";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return <><Dashboard/> </>;
}
