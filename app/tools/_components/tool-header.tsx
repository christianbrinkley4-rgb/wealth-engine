import Link from "next/link";
export function ToolHeader({ crumbs, title, lede }: {
  crumbs: Array<{ name: string; href?: string }>; title: string; lede: string;
}) {
  return <header className="tool-header app-shell max-w-5xl">
    <nav aria-label="Breadcrumb"><ol className="flex flex-wrap gap-2 text-15">{crumbs.map((crumb, i) =>
      <li key={crumb.name}>{i > 0 ? <span aria-hidden>/ </span> : null}{crumb.href ? <Link href={crumb.href}>{crumb.name}</Link> : <span aria-current="page">{crumb.name}</span>}</li>)}</ol></nav>
    <h1 className="text-32 mt-3 font-semibold">{title}</h1>
    <p className="text-17 mt-3">{lede}</p>
    <p className="text-15 mt-2">Your numbers and answers stay on your device.</p>
  </header>;
}
