import fs from "node:fs/promises";
import path from "node:path";

import {
  featured_badges,
  framework_badges,
  language_badges,
  service_badges,
  tool_badges,
} from "./config/data";
import theme from "./config/theme";
import { add_badges_markdown, build_stats_urls, Tag } from "./config/utils";

async function main() {
  let generated_readme = "";

  generated_readme = (
    await fs.readFile(path.join(process.cwd(), "./config/TEMPLATE.md"))
  ).toString("utf-8");

  generated_readme = add_badges_markdown({
    prev_content: generated_readme,
    sections: [
      {
        comment_tag: Tag.social_badges,
        badges: featured_badges,
        logo_color: theme.colors.secondary,
      },
      {
        comment_tag: Tag.language_badges,
        badges: language_badges,
        logo_color: theme.colors.primary,
      },
      {
        comment_tag: Tag.framework_badges,
        badges: framework_badges,
        logo_color: theme.colors.primary,
      },
      {
        comment_tag: Tag.service_badges,
        badges: service_badges,
        logo_color: theme.colors.primary,
      },
      {
        comment_tag: Tag.tool_badges,
        badges: tool_badges,
        logo_color: theme.colors.primary,
      },
    ],
  });

  const stats_urls = build_stats_urls();

  generated_readme = generated_readme
    .replace("{dark_stats_url}", stats_urls.dark)
    .replace("{light_stats_url}", stats_urls.light);

  await fs.writeFile("README.md", generated_readme);
}

main();
