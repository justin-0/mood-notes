import Editor from "@/components/editor";
import getEntry from "@/data-access-layer/entry";
import { redirect } from "next/navigation";

type EntryPageProps = {
  params: {
    entryID: string;
  };
};

export default async function EntryPage({ params }: EntryPageProps) {
  const id = params.entryID;
  const entry = await getEntry(id);
  if (!entry) return redirect("/journal");
  return <Editor data={entry?.data} />;
}
