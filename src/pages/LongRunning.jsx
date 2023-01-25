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
} from "@chakra-ui/react";

export default function LongRunning() {
  const [short, setShort] = useState([]);
  const [medium, setMedium] = useState([]);
  const [long, setLong] = useState([]);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const datas = await axios.get("/lngrng");

      setShort(datas.data.short);
      setMedium(datas.data.medium);
      setLong(datas.data.long);
      console.log(datas.data)

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
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Flex>
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
              <Th>^ 15 Minutes</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading === true ? (
              <Tr>
                <Td colSpan={3}>
                  <Spinner />
                </Td>
              </Tr>
            ) : (
              short.map((e) => (
                  <Tr>
                    <Td>{e.hostname}</Td>
                    </Tr>
                ))
                
            )}
            
          </Tbody>
        </Table>

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
              <Th>^ 1 Hour</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading === true ? (
              <Tr>
                <Td colSpan={3}>
                  <Spinner />
                </Td>
              </Tr>
            ) : (
              medium.map((e) => (
                  <Tr>
                    <Td>{e.hostname}</Td>
                </Tr>
                ))
                
            )}
            
          </Tbody>
        </Table>

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
              <Th>^ 1 Day</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading === true ? (
              <Tr>
                <Td colSpan={3}>
                  <Spinner />
                </Td>
              </Tr>
            ) : (
              long.map((e) => (
                  <Tr>
                    <Td>{e.hostname}</Td>
                </Tr>
                ))
                
            )}
            
          </Tbody>
        </Table>
        </Flex>
      </Box>
    </div>
  );
}
