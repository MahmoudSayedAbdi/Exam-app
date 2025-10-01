import React from 'react';

export default function HeaderDialog() {
    return (
        <header className="felx flex-col gap-7">
            {/* navigation steps */}
            <ol className="flex items-center justify-between w-full">
                {Array.from({ length: 10 }, (_, i) => i).map((i) => (
                    <li key={i} className="flex items-center w-full">
                        <div className={`flex items-center justify-center size-5 rounded-full shrink-0 bg-blue-300 `}></div>
                    </li>
                ))}
            </ol>
        </header>
    );
}
