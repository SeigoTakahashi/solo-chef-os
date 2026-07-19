import { AlertCircle } from "lucide-react";

type InputErrorMessageProps = {
  title?: string;
  message?: string;
};

export default function ErrorMessage({
  title,
  message,
}: InputErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-2xl border-2 border-red-200 bg-red-50 px-4 py-3.5"
    >
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
        <AlertCircle className="h-4 w-4" strokeWidth={2.6} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold text-red-600">
          {title || "エラーが発生しました"}
        </p>
        <p className="mt-0.5 text-sm font-medium leading-relaxed text-red-500/90 text-pretty">
          {message || "もう一度確認してください。"}
        </p>
      </div>
    </div>
  );
}
