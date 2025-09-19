// "use client";

// import { useEffect } from "react";

// export default function LanguageProvider({ locale }: { locale: string }) {
//     useEffect(() => {
//         document.documentElement.lang = locale;
//         // Yoruba uses left-to-right, same as English
//         document.documentElement.dir = "ltr";
//     }, [locale]);

//     return null;
// }
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function LanguageProvider({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  useEffect(() => {
    // ✅ Keep html <lang> and text direction correct
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr"; // Yoruba + English = LTR
  }, [locale]);

  const switchLanguage = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    // ✅ Navigate to same path but with new locale prefix
    router.replace({ pathname }, { locale: newLocale });
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLanguage("en")}
        className={currentLocale === "en" ? "font-bold" : ""}
      >
        
      </button>
      <button
        onClick={() => switchLanguage("yo")}
        className={currentLocale === "yo" ? "font-bold" : ""}
      >
      </button>
    </div>
  );
}
