import { useTranslations } from "next-intl";

export default function Categories() {
  const t = useTranslations("categories");
  return (
      <h1 className="text-4xl font-bold">{t("title")}</h1>
  );
}
