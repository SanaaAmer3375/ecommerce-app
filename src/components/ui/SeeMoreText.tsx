"use client";

import { useState } from "react";

export default function SeeMoreText({
    text,
    limit = 60,
    }: {
    text: string;
    limit?: number;
    }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = text.length > limit;

    return (
        <p className="text-xs text-text-muted leading-relaxed">
        {isLong && !expanded ? text.slice(0, limit) + "..." : text}
        {isLong && (
            <button
            onClick={(e) => {
                e.preventDefault();
                setExpanded(!expanded);
            }}
            className="text-primary font-medium ml-1 hover:underline"
            >
            {expanded ? "see less" : "see more"}
            </button>
        )}
        </p>
    );
}