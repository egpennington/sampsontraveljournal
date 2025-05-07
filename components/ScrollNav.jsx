import { useState, useEffect } from "react";

const sections = [
  { id: "2", label: "Galveston Bay" },
  { id: "2b", label: "Neighborhood Patrol" },
  { id: "2d", label: "One Last Look" },
  { id: "3a", label: "Colorado Stop" },
  { id: "4a", label: "Edmonton" },
  { id: "6", label: "Yukon Border" },
  { id: "8", label: "Anchorage" },
  { id: "10", label: "First Couch" },
  { id: "12", label: "Pantry Time" },
  { id: "14", label: "Still My Spot" },
  { id: "16", label: "Last Stroll" },
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
      <a href="#top" className="scroll-top-link">⬆ Back to Top</a>
    </nav>
  );
}