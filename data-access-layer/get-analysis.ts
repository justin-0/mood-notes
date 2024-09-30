import getCurrentUser from "@/lib/current-user";
import prisma from "@/lib/db";

export default async function getAnalysis(id: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return;
    const analysis = await prisma.analysis.findUnique({
      where: {
        entryId: id,
      },
    });
    return analysis;
  } catch (e) {
    if (e instanceof Error) {
      console.log("Get_Entries", e.message);
    }
  }
}
