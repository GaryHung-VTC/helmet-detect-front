import React, { useState, useCallback, useRef } from "react";
import {
  VStack,
  HStack,
  Box,
  Input,
  Button,
  Text,
  Divider,
  useToast,
} from "@chakra-ui/react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useAuthStore from "../../hooks/auth";

const Chat = () => {
  const bottomRef = useRef(null);

  const toast = useToast();

  const { token } = useAuthStore.getState();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const wsUrl = `ws://localhost:3000/ws/chat?token=${token}`;

  const { sendMessage, readyState } = useWebSocket(wsUrl, {
    onMessage: useCallback((event) => {
      toast({
        title: "New Message",
        isClosable: true,
      });

      let mesasgeFromWS = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, mesasgeFromWS]);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 200);
    }, []),
  });

  const handleSendMessage = () => {
    if (message) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <VStack width="100%" spacing={4}>
      <Box
        backgroundColor="white"
        color="black"
        flex="1"
        maxHeight="300px"
        overflowY="auto"
        p={4}
        borderWidth="1px"
        borderRadius="md"
        w="100%"
      >
        {messages.map((msg, index) => (
          <React.Fragment key={index}>
            <HStack
              w="100%"
              justifyContent="flex-start"
              alignItems="center"
              mb={2}
            >
              <Box>
                <VStack spacing={1} alignItems="start">
                  <Text fontWeight="bold" fontSize="sm">
                    {msg.user}
                  </Text>
                  <Box>
                    <Text>{msg.message}</Text>
                  </Box>
                  <Text fontSize="xs">{msg.timestamp}</Text>
                </VStack>
              </Box>
            </HStack>
            <Divider />
          </React.Fragment>
        ))}
        <div ref={bottomRef} />
      </Box>

      <Box>
        <Input
          placeholder="Type your message"
          color="white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <Button
          colorScheme="blue"
          onClick={handleSendMessage}
          disabled={readyState !== ReadyState.OPEN}
          mt={2}
        >
          Send
        </Button>
      </Box>
    </VStack>
  );
};

export default Chat;
