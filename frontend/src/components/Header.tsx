import { CookingPot } from "lucide-react";

type HeaderProps = {
  setPage: (page: number) => void;
};

export default function Header({ setPage }: HeaderProps) {
  const handleLogoClick = () => {
    localStorage.clear(); // localStorageを明示的にクリアする
    setPage(0);
    window.location.reload();
  };
  return (
    <>
      {/* Header */}
      <header
        className="flex items-center gap-2 px-6 py-5 cursor-pointer"
        onClick={handleLogoClick}
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500">
          <CookingPot className="h-4 w-4 text-white" strokeWidth={2} />
        </div>
        <span className="text-sm font-bold tracking-tight text-slate-800">
          SoloChef <span className="text-orange-500">OS</span>
        </span>
      </header>
    </>
  );
}
