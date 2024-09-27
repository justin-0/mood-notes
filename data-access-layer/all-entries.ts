import prisma from "@/lib/db";

export default async function getEntries(userId: string | null) {
  if (!userId) {
    return;
  }

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        clerkUserId: userId,
      },
    });

    const entries = await prisma.entry.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return entries;
  } catch (e) {
    if (e instanceof Error) {
      console.log("Get_Entries", e.message);
    }
  }
}
