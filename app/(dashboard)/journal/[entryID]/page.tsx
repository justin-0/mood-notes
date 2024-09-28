import Editor from "@/components/editor";
import getEntry from "@/data-access-layer/get-entry";
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

  return (
    <div className="h-[calc(100vh-64px)] w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor data={entry.data} />
      </div>
      <div className="border-l border-black/10">
        <div className="p-4 text-3xl">colour analysis for bg</div>
        <div className="font-semibold text-lg px-4 space-y-4">
          <div>
            <p>Subject:</p>
          </div>
          <div>
            <p>Summary:</p>
          </div>
          <div>
            <p>Mood:</p>
          </div>
          <div>
            <p>Negative Entry: True / False</p>
          </div>
        </div>
      </div>
    </div>
  );
}
