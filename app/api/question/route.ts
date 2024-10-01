import getEntries from "@/data-access-layer/all-entries";
import { questionAnswer } from "@/lib/ai";
import getCurrentUser from "@/lib/current-user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return new NextResponse("Unauthorised", { status: 404 });

  const { question } = await req.json();
  const entries = await getEntries();
  if (!entries) return new NextResponse("No entries", { status: 404 });
  const answer = await questionAnswer(question, entries);

  return NextResponse.json({ data: answer });
}
