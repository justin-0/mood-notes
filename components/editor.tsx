"use client";

import React from "react";
import { Entry } from "@prisma/client";
import { useAutosave } from "react-autosave";
import { updateEntry } from "@/lib/api";
import { useRouter } from "next/navigation";

type EditorProps = {
  data: Entry;
};

export default function Editor({ data }: EditorProps) {
  const router = useRouter();
  const [content, setContent] = React.useState(data.content);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  useAutosave({
    data: content,
    onSave: async (value) => {
      setIsLoading(true);
      await updateEntry(data.id, value);
      setIsLoading(false);
      router.refresh();
    },
  });

  return (
    <div className="w-full h-full">
      {isLoading ? <span>Saving..</span> : null}
      <div>
        <textarea
          className="p-10 w-full h-[calc(100vh-120px)] text-xl outline-none resize-none"
          value={content}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
