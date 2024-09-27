import { Entry } from "@prisma/client";

type EntryCardProps = {
  entry: Entry;
};

export default function EntryCard({ entry }: EntryCardProps) {
  const created = new Date(entry.createdAt).toDateString();

  return (
    <div className=" border border-black/5 shadow-sm rounded-xl p-3">
      <div>{created}</div>
      <div>summary from ai</div>
      <div>mood rating</div>
    </div>
  );
}
