import React from "react";

export default function UiCard() {
    return (
        <>
            <div
                className={`border h-full w-full ColoredGradient-Card bg-gradient-to-bl ${ColorVariable[color]} rounded-xl p-5`}
                {...props}
            >
                <div className="flex-col gap relative">{children}</div>
            </div>
        </>
    );
}
