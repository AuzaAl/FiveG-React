import { ArrowUpRight } from "lucide-react";
import React from "react";

export default function ButtonTextedStyle({
  href = "#",
  text = "NullText",
  tipe = "button", // bisa 'link' atau 'button'
  onClick, // optional handler kalau button
  ...props
}) {
  const baseClass =
    "rounded-xl text-xl text-white px-4 py-2 font-semibold uppercase transition-colors duration-200 hover:bg-white/10 flex items-center gap-2 w-fit";

  if (tipe === "button") {
    return (
      <button {...props} onClick={onClick} className={baseClass}>
        {text}
        <ArrowUpRight className="w-5 h-5" />
      </button>
    );
  }

  return (
    <a href={href} className={baseClass}>
      {text}
      <ArrowUpRight className="w-5 h-5" />
    </a>
  );
}