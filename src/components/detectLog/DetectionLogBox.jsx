import { VStack, Box, Text, Link } from "@chakra-ui/react";
import ImageLink from "../ImageLink";

const DetectionLogBox = ({ records, bottomRef }) => {
  return (
    <VStack width="100%" spacing={4}>
      <Box
        backgroundColor="white"
        color="black"
        borderRadius="md"
        boxShadow="sm"
        width="100%"
        p={4}
        maxHeight="300px"
        overflowY="auto"
      >
        {records.map((record, index) => (
          <Text key={index}>
            <ImageLink
              imagePath={`/captured_images/${record.image_name}`}
              label={record.timestamp}
            />
          </Text>
        ))}
        {bottomRef && <div ref={bottomRef} />}
      </Box>
    </VStack>
  );
};

export default DetectionLogBox;
