import { useTranslations } from "next-intl";

export default function Blog() {
  const t = useTranslations("blog");
  return (
      <h1 className="text-4xl font-bold">{t("title")}</h1>
  );
}
