import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="outline outline-red-400 max-w-[700px] space-y-2">
        <h1 className="text-5xl font-bold">
          Keep track of your mood with your daily journal
        </h1>
        <p className="text-2xl">
          Start writing your daily entires and our LLM will analyse it to let
          you know how you are feeling
        </p>
        <div className="mt-4">
          <Link href="/">
            <button className="border border-black px-3 py-1 rounded-lg hover:bg-slate-100  transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
