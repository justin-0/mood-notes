import { Entry } from "@prisma/client";
import { analyse } from "./ai";

// Created so wherever it is hosted the url will always be correct
const url = (path: string) => window.location.origin + path;
export const createNewEntry = async () => {
  const res = await fetch(
    new Request(url("/api/journal"), {
      method: "POST",
    })
  );

  if (!res.ok) {
    throw new Error("New journal entry not created");
  }

  const data: { data: Entry } = await res.json();
  return data.data;
};

export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(new Request(url(`/api/journal/${id}`)), {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error("Journal entry not updated");
  }

  const data: { data: Entry } = await res.json();
  return data.data;
};
