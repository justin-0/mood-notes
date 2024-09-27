import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export default async function POST() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 404 });
  }
  const entry = await prisma.entry.create({
    data: {
      userId,
      content: "Write about your day",
    },
  });

  return NextResponse.json({ data: entry });
}
