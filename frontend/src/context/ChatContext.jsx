import { createContext, useState } from "react";
import { askChatbot } from "../services/chatbotService";

export const ChatContext = createContext(null);

const initialMessages = [
  { id: 1, sender: "bot", text: "Hello. Ask me about foods, orders, or delivery." },
];

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState(initialMessages);

  const sendMessage = async (text) => {
    const userMessage = { id: Date.now(), sender: "user", text };
    setMessages((current) => [...current, userMessage]);

    const reply = await askChatbot(text);
    const botMessage = { id: Date.now() + 1, sender: "bot", text: reply.reply };
    setMessages((current) => [...current, botMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}
