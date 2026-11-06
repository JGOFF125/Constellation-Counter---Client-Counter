import type { ReactNode } from "react";

type FeaturePanelProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export default function FeaturePanel({
  id,
  eyebrow,
  title,
  description,
  children,
}: FeaturePanelProps) {
  return (
    <section className="feature-panel" id={id}>
      <header className="panel-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="muted">{description}</p>
      </header>
      {children}
    </section>
  );
}
