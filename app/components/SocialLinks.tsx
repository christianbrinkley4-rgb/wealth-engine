import { publishedProfiles } from "@/lib/agent";

/**
 * Visible text links to confirmed public profiles. Labels, not icons, so the
 * names of the sites are readable without relying on pictures.
 */
export function SocialLinks({ className }: { className?: string }) {
  const profiles = publishedProfiles();
  if (profiles.length === 0) return null;

  return (
    <nav aria-label="Public profiles" className={className}>
      <p className="text-13 font-medium tracking-[0.1em] uppercase opacity-80">Find me online</p>
      <ul className="text-16 mt-1 flex flex-col">
        {profiles.map((profile) => (
          <li key={profile.network}>
            <a
              href={profile.url}
              rel="me noopener noreferrer"
              target="_blank"
              className="inline-flex min-h-11 items-center underline underline-offset-2"
            >
              Find me on {profile.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
