"use client";

import { createNewEntry } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NewEntryCard() {
  const router = useRouter();
  const handleClick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
    // router.refresh();
  };
  return (
    <div className="border rounded-lg border-black/10 w-1/4 hover:bg-slate-200/10 transiton h-12 flex items-center justify-center">
      <div className="flex items-center justify-center">
        <button className="px-2 py-2" onClick={handleClick}>
          Create Entry
        </button>
      </div>
    </div>
  );
}
