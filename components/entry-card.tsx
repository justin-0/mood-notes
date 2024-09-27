import { Entry } from "@prisma/client";

type EntryCardProps = {
  entry: Entry;
};

export default function EntryCard({ entry }: EntryCardProps) {
  return <div>Entry {entry.id}</div>;
}
