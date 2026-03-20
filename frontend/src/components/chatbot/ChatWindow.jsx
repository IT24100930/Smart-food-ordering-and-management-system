import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

function ChatWindow({ messages, onSend }) {
  return (
    <div className="chat-window">
      <div className="chat-messages">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <ChatInput onSend={onSend} />
    </div>
  );
}

export default ChatWindow;
