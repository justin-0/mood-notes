import EntryCard from "@/components/entry-card";
import NewEntryCard from "@/components/new-entry-card";
import Question from "@/components/question-ai";
import getEntries from "@/data-access-layer/all-entries";
import Link from "next/link";

export default async function JournalPage() {
  const entries = await getEntries();

  return (
    <div className="grid grid-cols-3 gap-4 p-10">
      <Question />
      <NewEntryCard />
      {entries?.map((entry) => (
        <Link href={`/journal/${entry.id}`} key={entry.id}>
          <EntryCard entry={entry} analysis={entry.analysis} />
        </Link>
      ))}
    </div>
  );
}
