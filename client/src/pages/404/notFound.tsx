import { ShieldAlert } from "lucide-react";
import { ErrorResponse, useRouteError } from "react-router-dom"

export default function NotFound() {

  const error = useRouteError() as ErrorResponse;
  console.error(error)

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white border shadow-lg w-96 h-fit rounded-2xl">
        <ShieldAlert size={44} strokeWidth={1.5} className="text-red-600"/>
        <h1 className="text-2xl font-semibold leading-6">Une erreur est survenue</h1>
        <div className="flex flex-col w-full p-4 text-red-600 border rounded-md border-red-600/60 bg-red-600/10">
          <span className="text-lg font-semibold">{error?.status || 500}</span>
          <span className="text-sm">{error?.data || 'Erreur inconnue'}</span>
        </div>
      </div>
    </div>
  )
}