import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

const useChatbot = () => useContext(ChatContext);

export default useChatbot;
