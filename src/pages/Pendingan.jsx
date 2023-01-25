import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Spinner,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  HStack,
  Badge,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

export default function Pendingan() {
  const [datas, setDatas] = useState([])

  const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('')

  const getData = async () => {
    setLoading(true);
    try {
      const data = await axios.get("/pendingan");
      console.log(data.data.pendingans)

      setDatas(data.data.pendingans)
    setLoading(false)

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="content">
      <Alert status='error' variant="left-accent">
        <AlertIcon />
        Under Maintenance
      </Alert>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" marginTop={10}>
        <Table
          variant="simple"
          size={"lg"}
          width="100%"
          style={{
            width: "100%",
          }}
          colorScheme={"facebook"}
        >
          <Thead position="sticky" top={0} bgColor="white" zIndex={3}>
            <Tr>
              <Th>Date</Th>
              <Th>Activity</Th>
              <Th>Notes</Th>
              <Th>Status</Th>
              <Th>Agent</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading === true ? (
              <Tr>
                <Td colSpan={3}>
                  <Spinner />
                </Td>
              </Tr>
            ) : datas.map((e,idx) => (
                <Tr>
                    <Td>
                        {e.date}
                    </Td>
                    <Td>
                        {e.activity}
                    </Td>
                    <Td>
                        {e.notes}
                    </Td>
                    <Td>
                        {e.status}
                    </Td>
                    <Td>
                        {e.agent_id}
                    </Td>
                </Tr>
            ))
            
            }
            
          </Tbody>
        </Table>

        
      </Box>
    </div>
  );
}
