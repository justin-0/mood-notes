import getCurrentUser from "@/lib/current-user";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) return new NextResponse("Unauthorised", { status: 404 });

  const entry = await prisma.entry.create({
    data: {
      userId: user?.id,
      content: "Write about your day",
    },
  });

  revalidatePath("/journal", "page");

  return NextResponse.json({ data: entry });
}
