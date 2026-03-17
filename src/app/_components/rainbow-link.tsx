import { useState } from "react";

const rainbow = [
  "#ff0000",
  "#ff6600",
  "#ffcc00",
  "#33cc33",
  "#0099ff",
  "#6633cc",
  "#cc33cc",
];

const RainbowLink = ({
  text,
  link,
  target,
}: {
  text: string;
  link?: string;
  target?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const letters = text.split("");

  return (
    <a
      href={link ?? "#"}
      target={target ? target : "_self"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex no-underline"
      style={{ textDecoration: "none" }}
    >
      {letters.map((l, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            color: hovered ? rainbow[i % rainbow.length] : "inherit",
            textDecoration: hovered ? "none" : "underline",
            transform: hovered ? "rotateY(360deg)" : "rotateY(0deg)",
            transition: `transform 0.1s ease ${i * 0.07}s, color 0.1s ease ${i * 0.07}s`,
          }}
        >
          {l === " " ? "\u00A0" : l}
        </span>
      ))}
    </a>
  );
};

export default RainbowLink;
