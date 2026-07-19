import { CookingPot } from "lucide-react";

type Step_0_StartProps = {
  setPage: (page: number) => void;
};

export default function Step_0_Start({ setPage }: Step_0_StartProps) {
  const handleStartClick = () => {
    localStorage.clear(); // localStorageを明示的にクリアする
    setPage(1);
  };
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center sm:px-6">
      {/* Logo / Title */}
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-orange-100 bg-orange-50">
          <CookingPot className="h-8 w-8 text-orange-500" strokeWidth={2.2} />
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-800 text-balance sm:text-5xl">
        SoloChef <span className="text-orange-500">OS</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 text-pretty sm:text-lg">
        {"〜 考える手間ゼロ。"}
        <br className="sm:hidden" />
        {"あなたのための健康飯 〜"}
      </p>

      {/* Start button */}
      <button
        type="button"
        className="group mt-10 inline-flex items-center gap-3 rounded-2xl border-b-4 border-orange-600 bg-orange-500 px-7 py-3.5 text-base font-bold text-white shadow-sm transition-all hover:bg-orange-500/95 active:translate-y-1 active:border-b-2 sm:px-8 sm:py-4 sm:text-lg"
        onClick={handleStartClick}
      >
        <CookingPot className="h-6 w-6" strokeWidth={2.4} />
        はじめる
      </button>
    </div>
  );
}
