import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader2 size="40px" className="text-sky-500 animate-spin" />
    </div>
  )
}