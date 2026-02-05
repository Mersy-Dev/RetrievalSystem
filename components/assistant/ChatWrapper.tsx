// ChatWrapper.tsx
"use client";
import { useState } from "react";
import ChatButton from "./ChatButton";
import ChatDrawer from "./ChatDrawer";

export default function ChatWrapper({ lang }: { lang: "en" | "yo" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatButton onClick={() => setOpen(true)} />
      <ChatDrawer open={open} onClose={() => setOpen(false)} lang={lang} />
    </>
  );
}
