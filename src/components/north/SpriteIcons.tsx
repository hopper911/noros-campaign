export function SpriteIcons() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute h-0 w-0 overflow-hidden"
      aria-hidden
    >
      <symbol id="cross" fill="none" viewBox="0 0 9 9">
        <path stroke="inherit" strokeWidth="3" d="M4.5 0v9M0 4.5h9" />
      </symbol>
      <symbol id="dropdown" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeWidth="1.2" d="M1 1l4 4 4-4" />
      </symbol>
      <symbol id="logo" viewBox="0 0 114 32">
        <path
          fill="currentColor"
          d="M21.215 6.837v22.331h-1.102L10.62 6.837H5.05A5.053 5.053 0 0 0 0 11.891v19.87h5.05V9.403h1.094l9.505 22.36h5.57a5.06 5.06 0 0 0 5.05-5.053V6.836zM42.36 27.293a8.018 8.018 0 0 1-8.018-8.018 8.018 8.018 0 0 1 8.018-8.019 8.018 8.018 0 0 1 8.019 8.019 8.018 8.018 0 0 1-8.019 8.018m0-20.453a12.435 12.435 0 1 0 0 24.87 12.435 12.435 0 0 0 0-24.87M52.725 6.378v-3.12L42.362 0 31.998 3.257v3.121L42.362 4.68zM58.483 16.418v15.345h5.06V11.495h10.084V6.84h-5.565a9.58 9.58 0 0 0-9.577 9.577zM82.513 11.495h4.4V6.84h-4.4V.593h-5.061V28.2a3.526 3.526 0 0 0 3.527 3.528h6.854V27.07h-5.32zM108.836 7.907c-2.964-1.828-7.065-1.793-10.287-.528q-.726.282-1.418.637V.593L91.618.509v31.22h5.513V15.717a4.036 4.036 0 0 1 1.548-3.268 5.85 5.85 0 0 1 3.892-1.325 5.44 5.44 0 0 1 3.724 1.31 4.07 4.07 0 0 1 1.536 3.281v16.014h5.513l.008-13.523c0-5.828-.905-8.071-4.516-10.3z"
        />
      </symbol>
    </svg>
  );
}

export function Cross({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      width="9"
      height="9"
      className={`absolute block stroke-[var(--bc-icon,var(--bc-icon-default))] ${className ?? ""}`}
      aria-hidden
    >
      <use href="#cross" />
    </svg>
  );
}
