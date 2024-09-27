import { auth } from "@clerk/nextjs/server";
import prisma from "./db";

export default async function getCurrentUser() {
  const { userId } = auth();

  if (!userId) return;

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  return user;
}
