import { useState, useCallback, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import useWebSocket from "react-use-websocket";
import DetectionLogBox from "./DetectionLogBox";

const Chat = () => {
  const bottomRef = useRef(null);

  const toast = useToast();

  const [messages, setMessages] = useState([]);

  const wsUrl = "ws://localhost:3000/ws/alert";

  useWebSocket(wsUrl, {
    onMessage: useCallback((event) => {
      toast({
        title: "Object Detected",
        description: event.data,
        status: "error",
        isClosable: true,
      });
      setMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 200);
    }, []),
  });

  return <DetectionLogBox records={messages} bottomRef={bottomRef} />;
};

export default Chat;
