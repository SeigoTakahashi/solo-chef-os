import { ChefHat } from "lucide-react";
const Header: React.FC = () => {
  return (
    <>
      {/* Header */}
      <header className="flex items-center gap-2 px-6 py-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500">
          <ChefHat className="h-4 w-4 text-white" strokeWidth={2} />
        </div>
        <span className="text-sm font-bold tracking-tight text-slate-800">
          SoloChef OS
        </span>
      </header>
    </>
  );
};

export default Header;
