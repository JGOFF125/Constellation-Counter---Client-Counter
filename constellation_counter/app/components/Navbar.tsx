import Link from "next/link";
import SparkBrand from "./SparkBrand";

export default function Navbar() {
  return (
    <header className="topbar">
      <Link
        href="/dashboard"
        className="brand"
        aria-label="Constellation Counter dashboard"
      >
        <span className="brand-mark" aria-hidden="true">
          <SparkBrand />
        </span>
        <span>
          <strong>
            Constellation<span className="brand-counter"> Counter</span>
          </strong>
          <small>TELUS Spark · Science Centre</small>
        </span>
      </Link>
      <div className="topbar-actions">
        <span className="prototype-badge">
          <span />
          Prototype
        </span>
        <Link className="account-link" href="/login">
          Demo login <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
