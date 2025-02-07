import type { ReadmeBadge } from "./data";
import theme from "./theme";

const newline = "\n";
const tab = "\t";
const dbl_tab = "\t\t";
const badge_base_url = "https://img.shields.io/badge";

export enum Tag {
  social_badges = "SOCIAL_BADGES",
  language_badges = "LANGUAGE_BADGES",
  framework_badges = "FRAMEWORK_BADGES",
  service_badges = "SERVICE_BADGES",
  tool_badges = "TOOL_BADGES",
}

type BuildBadgeUrlsArgs = {
  label: string;
  logo: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  logo_color: any;
};

function build_badge_urls({ label, logo, logo_color }: BuildBadgeUrlsArgs) {
  const shared_params = "style=for-the-badge&logoSize=auto";
  const dark_badge_url = `${badge_base_url}/${label}-${theme.colors.surface.dark}?logo=${logo}&logoColor=${logo_color.dark}&${shared_params}`;
  const light_badge_url = `${badge_base_url}/${label}-${theme.colors.surface.light}?logo=${logo}&logoColor=${logo_color.light}&${shared_params}`;
  return {
    dark: dark_badge_url,
    light: light_badge_url,
  };
}

type AddBadgesMarkdownArgs = {
  prev_content: string;
  sections: {
    comment_tag: Tag;
    badges: ReadmeBadge[];
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    logo_color: any;
  }[];
};

export function add_badges_markdown({
  prev_content,
  sections,
}: AddBadgesMarkdownArgs): string {
  let updated_md = prev_content;

  for (let i = 0; i < sections.length; i++) {
    const { comment_tag, badges, logo_color } = sections[i];

    const badges_md: string[] = [];

    badges_md.push(newline);

    for (let i = 0; i < badges.length; i++) {
      const { static_label, label, logo, href } = badges[i];
      const badge_urls = build_badge_urls({ label, logo, logo_color });

      const source_str = `<source srcset="${badge_urls.light}" media="(prefers-color-scheme: light)" />`;
      const img_str = `<img src="${badge_urls.dark}" alt="${
        static_label ? static_label : label
      } badge" />`;

      const md_content = href
        ? [
            `<a href="${href}">${newline}`,
            `${tab}<picture>${newline}`,
            `${dbl_tab}${source_str}${newline}`,
            `${dbl_tab}${img_str}${newline}`,
            `${tab}</picture>${newline}`,
            "</a>",
          ].join("")
        : [
            `<picture>${newline}`,
            `${tab}${source_str}${newline}`,
            `${tab}${img_str}${newline}`,
            "</picture>",
          ].join("");

      badges_md.push(md_content);
      badges_md.push(newline);
    }

    const generated_content = badges_md.join("");
    updated_md = build_readme({
      prev_content: updated_md,
      generated_content,
      comment_tag,
    });
  }

  return updated_md;
}

type BuildReadmeArgs = {
  prev_content: string;
  generated_content: string;
  comment_tag: Tag;
};

export function build_readme({
  prev_content,
  generated_content,
  comment_tag,
}: BuildReadmeArgs): string {
  const tag_to_find = `<!-- ${comment_tag}`;
  const closing_tag = "-->";
  const start_index_of_opening_tag = prev_content.indexOf(
    `${tag_to_find}:START`
  );
  const end_index_of_opening_tag = prev_content.indexOf(
    closing_tag,
    start_index_of_opening_tag
  );
  const start_index_of_closing_tag = prev_content.indexOf(
    `${tag_to_find}:END`,
    end_index_of_opening_tag
  );

  return [
    prev_content.slice(0, end_index_of_opening_tag + closing_tag.length),
    newline,
    generated_content,
    newline,
    prev_content.slice(start_index_of_closing_tag),
  ].join("");
}

export function build_stats_urls(): { dark: string; light: string } {
  const base_url =
    "https://github-readme-stats-flame-phi-47.vercel.app/api?username=adamjnavarro";
  const shared_params =
    "&hide=stars&border_radius=6&hide_border=true&show_icons=true&line_height=30";
  const dark_url = base_url + shared_params + build_color_params(true);
  const light_url = base_url + shared_params + build_color_params(false);
  return {
    dark: dark_url,
    light: light_url,
  };
}

function build_color_params(is_dark: boolean): string {
  const { colors } = theme;

  return `&bg_color=${
    is_dark ? colors.surface.dark : colors.surface.light
  }&title_color=${
    is_dark ? colors.on_surface.dark : colors.on_surface.light
  }&text_color=${
    is_dark ? colors.on_surface_dimmed.dark : colors.on_surface_dimmed.light
  }&icon_color=${
    is_dark ? colors.primary.dark : colors.primary.light
  }&ring_color=${is_dark ? colors.primary.dark : colors.primary.light}`;
}
