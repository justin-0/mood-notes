import getCurrentUser from "@/lib/current-user";
import prisma from "@/lib/db";

export default async function getEntry(id: string) {
  const user = getCurrentUser();

  if (!user) return;

  const entry = await prisma.entry.findUnique({
    where: {
      id,
    },
  });

  if (!entry) return;

  return { data: entry };
}
