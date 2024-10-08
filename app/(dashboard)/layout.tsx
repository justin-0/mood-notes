import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen relative">
      <aside className="h-full fixed w-[180px] top-0 left-0 bottm-0 border-r border-black/20">
        Mood Notes
      </aside>
      <div className="ml-[180px] flex flex-col">
        <header className="h-16 px-6 flex items-center justify-end border-b border-black/20">
          <div>
            <UserButton />
          </div>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
}
