"use client";

import parse, { HTMLReactParserOptions, Element, domToReact } from "html-react-parser";
import markdownStyles from "./markdown-styles.module.css";
import RainbowLink from "./rainbow-link";

type Props = {
  content: string;
};

const CALLOUT_TYPES = {
  TIP:       { label: "Tip",       icon: "💡", classes: "bg-green-50 border-green-400 text-green-900" },
  INFO:      { label: "Info",      icon: "ℹ️",  classes: "bg-blue-50 border-blue-400 text-blue-900" },
  NOTE:      { label: "Note",      icon: "📝", classes: "bg-blue-50 border-blue-400 text-blue-900" },
  IMPORTANT: { label: "Important", icon: "⚠️", classes: "bg-yellow-50 border-yellow-400 text-yellow-900" },
  WARNING:   { label: "Warning",   icon: "🚨", classes: "bg-orange-50 border-orange-400 text-orange-900" },
  CAUTION:   { label: "Caution",   icon: "🔴", classes: "bg-red-50 border-red-400 text-red-900" },
} as const;

type CalloutType = keyof typeof CALLOUT_TYPES;

function getCalloutType(node: Element): CalloutType | null {
  const firstChild = node.children.find((c) => c.type === "tag") as Element | undefined;
  if (!firstChild || firstChild.name !== "p") return null;

  const firstText = firstChild.children.find((c) => "data" in c);
  if (!firstText || !("data" in firstText)) return null;

  const match = (firstText.data as string).match(/^\[!(TIP|INFO|NOTE|IMPORTANT|WARNING|CAUTION)\]/i);
  if (!match) return null;

  return match[1].toUpperCase() as CalloutType;
}

const parserOptions: HTMLReactParserOptions = {
  replace(node) {
    if (node instanceof Element && node.name === "blockquote") {
      const calloutType = getCalloutType(node);
      if (calloutType) {
        const { label, icon, classes } = CALLOUT_TYPES[calloutType];
        const firstParagraph = node.children.find((c) => c.type === "tag") as Element;
        const firstText = firstParagraph.children.find((c) => "data" in c);
        if (firstText && "data" in firstText) {
          (firstText as { data: string }).data = (firstText.data as string).replace(
            /^\[!(TIP|INFO|NOTE|IMPORTANT|WARNING|CAUTION)\]\s*/i,
            ""
          );
        }
        return (
          <div className={`border-l-4 rounded-r-lg px-5 py-4 my-6 ${classes}`}>
            <div className="font-semibold mb-1">{icon} {label}</div>
            <div>{domToReact(node.children as Parameters<typeof domToReact>[0], parserOptions)}</div>
          </div>
        );
      }
    }

    if (
      node instanceof Element &&
      node.name === "a" &&
      !("data-footnote-ref" in node.attribs) &&
      !("data-footnote-backref" in node.attribs)
    ) {
      const hasElementChildren = node.children.some(
        (child) => child.type === "tag"
      );
      if (hasElementChildren) return;

      const text = node.children
        .map((child) => ("data" in child ? child.data : ""))
        .join("");
      return (
        <RainbowLink
          text={text}
          link={node.attribs.href}
          target={node.attribs.target}
        />
      );
    }
  },
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className={markdownStyles["markdown"]}>
        {parse(content, parserOptions)}
      </div>
    </div>
  );
}
