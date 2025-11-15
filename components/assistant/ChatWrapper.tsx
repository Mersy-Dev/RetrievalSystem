"use client"; // Important — this is a client component

import { useState } from "react";
import ChatButton from "./ChatButton";
import ChatAssistant from "./ChatAssistance";
import ChatWindow from "./ChatWindow";

export default function ChatWrapper() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [category, setCategory] = useState<React.ComponentProps<typeof ChatWindow>["category"] | "">("");

  return (
    <>
      <ChatButton onClick={() => setOpenMenu(true)} />

      <ChatAssistant
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        onSelect={(cat: string) => {
          setCategory(cat as React.ComponentProps<typeof ChatWindow>["category"] | "");
          setOpenMenu(false);
          setOpenChat(true);
        }}
      />

      <ChatWindow
        open={openChat}
        category={category as React.ComponentProps<typeof ChatWindow>["category"]}
        onClose={() => setOpenChat(false)}
      />
    </>
  );
}
