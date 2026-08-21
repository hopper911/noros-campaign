"use client";

import { useState } from "react";

/** Downloads disabled site-wide — kept so old imports fail closed. */
export function DownloadButton({
  children,
  className = "btn-nav",
}: {
  href?: string;
  filename?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [error] = useState("Downloads are disabled");

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button type="button" disabled className={`${className} opacity-40`} title="Downloads disabled">
        {children}
      </button>
      <span className="font-mono text-[10px] tracking-normal text-red-400 normal-case">
        {error}
      </span>
    </span>
  );
}
