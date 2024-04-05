import { Loader2 } from "lucide-react";

type Props = {
  readonly spinnerSize?: number;
}

export default function LoadingBlock({spinnerSize = 40}:Props) {
  return (
    <div className="flex items-center justify-center w-full h-full text-sky-500">
      <Loader2 size={spinnerSize} className="animate-spin"/>
    </div>
  )
}