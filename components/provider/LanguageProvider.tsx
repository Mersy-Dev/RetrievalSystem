"use client";

import { useEffect } from "react";

export default function LanguageProvider({ locale }: { locale: string }) {
    useEffect(() => {
        document.documentElement.lang = locale;
        // Yoruba uses left-to-right, same as English
        document.documentElement.dir = "ltr";
    }, [locale]);

    return null;
}
