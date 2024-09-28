"use client";

import React from "react";
import { Entry } from "@prisma/client";

type EditorProps = {
  data: Entry;
};

export default function Editor({ data }: EditorProps) {
  const [content, setContent] = React.useState(data.content);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] p-10">
      <div>
        <textarea
          className="p-10 w-full h-[calc(100vh-120px)] text-xl outline-none"
          value={content}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
