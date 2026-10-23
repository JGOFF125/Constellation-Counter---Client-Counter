import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo / Company Name */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-slate-900"
        >
          Telus Spark
          <span className="ml-2 text-sm font-medium text-slate-500">
            Constellation Counter
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Dashboard
          </Link>

          <Link
            href="/other..."
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            Other...
          </Link>
        </div>
      </div>
    </nav>
  );
}
