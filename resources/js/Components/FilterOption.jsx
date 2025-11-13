import { Link } from "@inertiajs/react";
import React from "react";

export default function FilterOption({jenis='null'}) {
    return (
        <>
            <Link
                class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                href="#"
            >
                {jenis}
            </Link>
        </>
    );
}
