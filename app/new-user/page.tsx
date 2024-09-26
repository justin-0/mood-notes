import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function NewUserPage() {
  const { userId } = auth();
  console.log(userId, "USER ID FROM CLERK");
  if (!userId) {
    console.log("NO USERID FOUND");
    return redirect("/sign-up");
  }
  console.log("FINDING USER");
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });
  console.log(user, "USER FOUND?");

  if (user) {
    return redirect("/journal");
  } else {
    await prisma.user.create({
      data: {
        clerkUserId: userId,
      },
    });
    return redirect("/journal");
  }
}
