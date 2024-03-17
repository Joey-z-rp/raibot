import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="flex gap-2">
      <Link href="/">Control</Link>
      <Link href="/calibration">Calibration</Link>
      <Link href="/camera">Camera</Link>
      <Link href="/inspect">Inspect</Link>
    </nav>
  );
};
