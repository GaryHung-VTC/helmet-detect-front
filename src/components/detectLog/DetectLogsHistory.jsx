import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { authRequest } from "../../services/requestWrapper";
import DetectionLogBox from "./DetectionLogBox";

const DetectionLog = () => {
  const toast = useToast();

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await authRequest.get("/detection/");
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching records:", error);
        toast({
          title: error.response.statusText,
          description: error.response.data.detail,
          status: "error",
          isClosable: true,
        });
      }
    };

    fetchRecords();
  }, []);

  return <DetectionLogBox records={records} />;
};

export default DetectionLog;
