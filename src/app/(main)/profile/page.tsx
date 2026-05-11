import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfileClient from "../../../components/profile/ProfileClient";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/login");

  return <ProfileClient user={session.user} />;
}