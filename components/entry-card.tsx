import { Analysis, Entry } from "@prisma/client";

type EntryCardProps = {
  entry: Entry;
  analysis: Analysis | null;
};

export default function EntryCard({ entry, analysis }: EntryCardProps) {
  const created = new Date(entry.createdAt).toDateString();
  // console.log(analysis);

  return (
    <div className=" border border-black/5 shadow-sm rounded-xl p-3">
      <div>{created}</div>
      <div>
        <h3>Summary: {analysis?.summary}</h3>
      </div>
      <div>
        <h3>Mood: {analysis?.mood}</h3>
      </div>
    </div>
  );
}
