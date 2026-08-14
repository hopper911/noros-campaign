export function NorthLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-flex ${className}`}>
      <svg className="logo h-6 w-[6.1rem] sm:h-7 sm:w-[7.1rem]" aria-hidden>
        <use href="#logo" />
      </svg>
      <span
        className="pointer-events-none absolute top-[-2px] left-[32px] text-[8px] leading-none text-white sm:left-[38px] sm:text-[9px]"
        aria-hidden
      >
        ˆ
      </span>
    </span>
  );
}

export function NorosMark({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/north/noros.svg"
      alt="Noros"
      className={`h-[2rem] w-[10rem] max-w-[80vw] object-contain sm:h-[2.4rem] sm:w-[12rem] md:h-[4.2rem] md:w-[22rem] ${className}`}
    />
  );
}
