"use client";

import parse, { HTMLReactParserOptions, Element, domToReact } from "html-react-parser";
import markdownStyles from "./markdown-styles.module.css";
import RainbowLink from "./rainbow-link";

type Props = {
  content: string;
};

const TipIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 3.5c.4 0 .75.3.75.67v4.16a.75.75 0 0 1-1.5 0V7.17c0-.37.34-.67.75-.67z"/>
  </svg>
);
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm.25 3.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5z"/>
  </svg>
);
const ImportantIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1.5a.75.75 0 0 1 .692.462l5.5 11a.75.75 0 0 1-.692 1.038H2.5a.75.75 0 0 1-.692-1.038l5.5-11A.75.75 0 0 1 8 1.5zm0 4.25a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 0 1.5 0V6.5A.75.75 0 0 0 8 5.75zM8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
  </svg>
);
const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575zM8 5.25a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 0 1.5 0V6A.75.75 0 0 0 8 5.25zM8 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
  </svg>
);

const CALLOUT_TYPES = {
  TIP:       { label: "Tip",       Icon: TipIcon,       accent: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-300" },
  INFO:      { label: "Info",      Icon: InfoIcon,      accent: "text-sky-600",     bg: "bg-sky-50",     border: "border-sky-300" },
  NOTE:      { label: "Note",      Icon: InfoIcon,      accent: "text-sky-600",     bg: "bg-sky-50",     border: "border-sky-300" },
  IMPORTANT: { label: "Important", Icon: ImportantIcon, accent: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-300" },
  WARNING:   { label: "Warning",   Icon: WarningIcon,   accent: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-300" },
  CAUTION:   { label: "Caution",   Icon: WarningIcon,   accent: "text-rose-600",    bg: "bg-rose-50",    border: "border-rose-300" },
} as const;

type CalloutType = keyof typeof CALLOUT_TYPES;

function getCalloutType(node: Element): { type: CalloutType; inline: boolean } | null {
  const firstChild = node.children.find((c) => c.type === "tag") as Element | undefined;
  if (!firstChild || firstChild.name !== "p") return null;

  const firstText = firstChild.children.find((c) => "data" in c);
  if (!firstText || !("data" in firstText)) return null;

  const match = (firstText.data as string).match(/^\[!(TIP|INFO|NOTE|IMPORTANT|WARNING|CAUTION)(\s+inline)?\]/i);
  if (!match) return null;

  return { type: match[1].toUpperCase() as CalloutType, inline: !!match[2] };
}

const parserOptions: HTMLReactParserOptions = {
  replace(node) {
    if (node instanceof Element && node.name === "blockquote") {
      const callout = getCalloutType(node);
      if (callout) {
        const { label, Icon, accent, bg, border } = CALLOUT_TYPES[callout.type];
        const firstParagraph = node.children.find((c) => c.type === "tag") as Element;
        const firstText = firstParagraph.children.find((c) => "data" in c);
        if (firstText && "data" in firstText) {
          (firstText as { data: string }).data = (firstText.data as string).replace(
            /^\[!(TIP|INFO|NOTE|IMPORTANT|WARNING|CAUTION)(\s+inline)?\]\s*/i,
            ""
          );
        }
        if (callout.inline) {
          return (
            <div className={`rounded-xl border px-4 py-2 my-3 flex items-start gap-2 ${bg} ${border}`}>
              <span className={`mt-[6px] shrink-0 ${accent}`}><Icon /></span>
              <span className={`text-gray-800 ${markdownStyles["calloutBody"]}`}>{domToReact(firstParagraph.children as Parameters<typeof domToReact>[0], parserOptions)}</span>
            </div>
          );
        }
        return (
          <div className={`rounded-xl border px-4 py-2 my-3 ${bg} ${border}`}>
            <div className={`flex items-center gap-1.5 font-semibold text-sm uppercase tracking-wide mb-0.5 ${accent}`}>
              <Icon />{label}
            </div>
            <div className={`text-gray-800 ${markdownStyles["calloutBody"]}`}>{domToReact(node.children as Parameters<typeof domToReact>[0], parserOptions)}</div>
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
