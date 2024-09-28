"use client";

import { Entry } from "@prisma/client";

type EditorProps = {
  data: Entry;
};

export default function Editor({ data }: EditorProps) {
  return <div>{data.content}</div>;
}
