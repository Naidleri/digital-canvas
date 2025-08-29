import { Home, FolderKanban, Layers, Code2 } from "lucide-react";

const sections = [
  { id: "hero", icon: <Home />, label: "Home" },
  { id: "projects", icon: <FolderKanban />, label: "Projects" },
  { id: "tech", icon: <Code2 />, label: "Tech" },
  { id: "footer", icon: <Layers />, label: "Contact" },
];

export default function GlassNav() {
  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 
                    md:flex flex-col gap-4
                    hidden
                    backdrop-blur-lg bg-white/20 border border-white/30 
                    shadow-lg rounded-2xl p-3">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="flex items-center justify-center w-10 h-10 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition"
        >
          {s.icon}
        </a>
      ))}
    </nav>
  );
}


export function GlassNavMobile() {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 
                    flex md:hidden gap-4
                    backdrop-blur-lg bg-white/20 border border-white/30 
                    shadow-lg rounded-2xl px-4 py-2">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="flex items-center justify-center w-10 h-10 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition"
        >
          {s.icon}
        </a>
      ))}
    </nav>
  );
}

