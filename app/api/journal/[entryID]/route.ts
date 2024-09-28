import getCurrentUser from "@/lib/current-user";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { entryID: string } }
) {
  const id = params.entryID;
  const { content }: { content: string } = await req.json();
  const user = await getCurrentUser();
  if (!user) {
    return new NextResponse("Unauthorised", { status: 404 });
  }

  const updatedEntry = await prisma.entry.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content,
    },
  });

  return NextResponse.json({ data: updatedEntry });
}
