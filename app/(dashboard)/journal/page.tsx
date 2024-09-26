import getEntries from "@/data access layer/all-entries";
import { auth } from "@clerk/nextjs/server";

export default async function JournalPage() {
  const { userId } = auth();

  const entries = await getEntries(userId);
  return <h1>Journal</h1>;
}
