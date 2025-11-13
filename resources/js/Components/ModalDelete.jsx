import React from "react";

export default function ModalDelete({children}) {
    return (
        <div
            className="bg-gradient-to-br flex flex-col justify-center md:items-center from-darkui via-neutral-900 border border-border-color to-red-900 min-w-80 w-1/3 h-1/3 p-5 rounded-xl shadow-lg font-GenSan"
            onClick={(e) => e.stopPropagation()}
        >
        {children}
        </div>
    );
}
