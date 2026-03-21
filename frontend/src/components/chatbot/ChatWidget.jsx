import { useState } from "react";
import useChatbot from "../../hooks/useChatbot";
import ChatWindow from "./ChatWindow";

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { messages, sendMessage } = useChatbot();

  return (
    <div className="chat-widget">
      {open && <ChatWindow messages={messages} onSend={sendMessage} />}
      <button className="chat-toggle" onClick={() => setOpen((current) => !current)}>
        {open ? "Close Chat" : "Chat Help"}
      </button>
    </div>
  );
}

export default ChatWidget;
