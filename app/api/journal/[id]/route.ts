import { analyse } from "@/lib/ai";
import getCurrentUser from "@/lib/current-user";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
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

  const analysis = await analyse(content);
  const updatedAnalysis = await prisma.analysis.update({
    where: {
      entryId: id,
    },
    data: {
      ...analysis,
    },
  });

  return NextResponse.json({ data: updatedEntry, analysis: updatedAnalysis });
}
