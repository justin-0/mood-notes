import getCurrentUser from "@/lib/current-user";
import prisma from "@/lib/db";

export default async function getEntry(id: string) {
  const user = await getCurrentUser();

  if (!user) return;

  const entry = await prisma.entry.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!entry) return;

  return { data: entry };
}
