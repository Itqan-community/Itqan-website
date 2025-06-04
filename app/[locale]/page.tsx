import { getTranslations } from "next-intl/server";
import JoinUsBtn from "../components/JoinUsBtn";
export default async function Home() {
  const t = await getTranslations("home");
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-73px)] bg-[url('/home-hero.avif')] bg-center bg-cover bg-no-repeat bg-[#81ffb8]/50 bg-blend-overlay">
      <h1 className="text-[56px] font-bold text-[#6bb38b]">{t("title")}</h1>
      <p className="text-xl font-semibold">{t("description")}</p>
      <p className="text-xl font-semibold !mb-10">{t("description2")}</p>
      <JoinUsBtn locale={"ar"} />
    </div>
  );
}
