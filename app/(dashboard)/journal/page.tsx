import EntryCard from "@/components/entry-card";
import NewEntryCard from "@/components/new-entry-card";
import getEntries from "@/data-access-layer/all-entries";
import { auth } from "@clerk/nextjs/server";

export default async function JournalPage() {
  const { userId } = auth();

  const entries = await getEntries(userId);
  return (
    <div className="grid grid-cols-3 gap-4 p-10">
      <NewEntryCard />
      {entries?.map((entry) => (
        <EntryCard entry={entry} key={entry.id} />
      ))}
    </div>
  );
}
