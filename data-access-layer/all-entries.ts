import getCurrentUser from "@/lib/current-user";
import prisma from "@/lib/db";

export default async function getEntries() {
  try {
    const user = await getCurrentUser();
    const entries = await prisma.entry.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        analysis: true,
      },
    });
    return entries;
  } catch (e) {
    if (e instanceof Error) {
      console.log("Get_Entries", e.message);
    }
  }
}
