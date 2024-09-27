import getCurrentUser from "@/lib/current-user";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 404 });
  }

  const user = await getCurrentUser();
  if (!user) return;

  const entry = await prisma.entry.create({
    data: {
      userId: user?.id,
      content: "Write about your day",
    },
  });

  return NextResponse.json({ data: entry });
}
