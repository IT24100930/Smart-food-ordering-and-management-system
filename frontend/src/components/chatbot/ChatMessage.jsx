function ChatMessage({ message }) {
  return (
    <div className={`chat-message ${message.sender}`}>
      <span>{message.text}</span>
    </div>
  );
}

export default ChatMessage;
