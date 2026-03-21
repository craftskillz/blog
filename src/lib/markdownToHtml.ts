import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(remarkGfm).use(html, { sanitize: false }).process(markdown);
  // remark-gfm autolinks URL-like text inside raw <a> tags, creating invalid nested anchors.
  // Fix by collapsing <a outer><a inner>text</a></a> into <a outer>text</a>.
  return result.toString().replace(/<a ([^>]+)><a [^>]*>([\s\S]*?)<\/a><\/a>/g, "<a $1>$2</a>");
}
