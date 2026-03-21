import { useState } from "react";
import Button from "../common/Button";

function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Ask about menu, orders, or delivery..."
      />
      <Button type="submit">Send</Button>
    </form>
  );
}

export default ChatInput;
