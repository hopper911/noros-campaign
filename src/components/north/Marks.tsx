export function NorthLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={`logo h-7 w-[7.1rem] ${className}`} aria-hidden>
      <use href="#logo" />
    </svg>
  );
}

export function NorosMark({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/north/noros.svg"
      alt="Noros"
      className={`h-[2.4rem] w-[12rem] object-contain md:h-[4.2rem] md:w-[22rem] ${className}`}
    />
  );
}
