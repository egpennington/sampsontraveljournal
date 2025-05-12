import { useState, useEffect } from "react";

const sections = [
  { id: "3", label: "Window Down" },
  { id: "6", label: "One Last Look" },
  { id: "9", label: "Calgary" },
  { id: "12", label: "Yukon Grit" },
  { id: "15", label: "Just Me & Snow" },
  { id: "18", label: "Pantry Time" },
  { id: "20", label: "Still My Spot" },
  { id: "23", label: "I'm Watching" },
  { id: "26", label: "The Last Stroll" }
];

export default function ScrollNav() {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id.replace("entry-", ""));
        }
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(`entry-${section.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="scroll-nav">
      {sections.map((sec) => (
        <a
          key={sec.id}
          href={`#entry-${sec.id}`}
          className={activeId === sec.id ? "active" : ""}
        >
          {sec.label}
        </a>
      ))}
      <a href="#top" className="scroll-top-link">⬆ Back to Top ⬆</a>
    </nav>
  );
}
