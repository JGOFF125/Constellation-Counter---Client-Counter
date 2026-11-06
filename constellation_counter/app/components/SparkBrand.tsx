type SparkBrandProps = {
  className?: string;
  variant?: "mark" | "wordmark";
};

export default function SparkBrand({
  className = "",
  variant = "mark",
}: SparkBrandProps) {
  const toneId = `spark-ink-${variant}-${className || "header"}`;

  return (
    <svg
      className={`spark-artwork ${className}`}
      viewBox={variant === "wordmark" ? "300 1498 1012 360" : "1238 1719 72 70"}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={toneId} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 0 0.5451 0 0 0 0 0.1059 0 0 0 0 0.7098 0 0 0 1 0" />
        </filter>
      </defs>
      <image
        href="/brand/telus-spark-reference.png"
        width="1582"
        height="2048"
        filter={`url(#${toneId})`}
      />
    </svg>
  );
}
