import {
  AspectRatio,
  Box,
  Container,
  Image,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Chat from "../components/chat/Chat";
import DetectLogsHistory from "../components/detectLog/DetectLogsHistory";
import DetectLogsLive from "../components/detectLog/DetectLogsLive";

const HomePage = () => {
  return (
    <Container maxW="container.xl">
      <Flex width="100%" minWidth="max-content" alignItems="center" gap="2">
        <Box width="100%" p={3} w={"100%"}>
          <AspectRatio ratio={16 / 9}>
            <Image src="http://localhost:3000/video/feed" />
          </AspectRatio>
        </Box>

        <Tabs minWidth="350px">
          <TabList>
            <Tab>Chat</Tab>
            <Tab>Detect Logs (Live)</Tab>
            <Tab>Detect Logs (History)</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box
                backgroundColor="gray.700"
                borderRadius="md"
                boxShadow="xl"
                minHeight="400px"
                p={4}
              >
                <Chat />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                backgroundColor="gray.700"
                borderRadius="md"
                boxShadow="xl"
                minHeight="400px"
                p={4}
              >
                <DetectLogsLive />
              </Box>
            </TabPanel>
            <TabPanel>
              <Box
                backgroundColor="gray.700"
                borderRadius="md"
                boxShadow="xl"
                minHeight="400px"
                p={4}
              >
                <DetectLogsHistory />
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Container>
  );
};

export default HomePage;
