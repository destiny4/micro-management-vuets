export function generateTitle(this: any, title: string) {
  const hasKey = this.$te("route." + title);

  if (hasKey) {
    const translatedTitle = this.$t("route." + title);

    return translatedTitle;
  }
  return title;
}
