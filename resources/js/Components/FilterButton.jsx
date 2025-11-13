import React from "react";

export default function FilterButton({ children }) {
    return (
        <button class="flex rounded-lg items-center gap-1 px-3 py-1.5 text-sm font-medium text-text-color-light bg-gray-900/50 border border-gray-700/50 hover:bg-gray-800/70 hover:text-white transition-colors duration-200">
            {children}
        </button>
    );
}
