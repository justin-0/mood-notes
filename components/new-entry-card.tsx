"use client";

import { createNewEntry } from "@/lib/api";

export default function NewEntryCard() {
  const handleClick = async () => await createNewEntry();
  return (
    <div className="border rounded-lg border-black/10 w-1/4 hover:bg-slate-200/10 transiton">
      <div className="flex items-center justify-center">
        <button className="px-2 py-2" onClick={handleClick}>
          Create Entry
        </button>
      </div>
    </div>
  );
}
