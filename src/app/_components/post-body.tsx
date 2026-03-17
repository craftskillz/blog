"use client";

import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import markdownStyles from "./markdown-styles.module.css";
import RainbowLink from "./rainbow-link";

type Props = {
  content: string;
};

const parserOptions: HTMLReactParserOptions = {
  replace(node) {
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
