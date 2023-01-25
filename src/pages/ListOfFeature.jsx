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
} from "@chakra-ui/react";

export default function ListOfFeature() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const datas = await axios.get("/listoffeature");

      setData(datas.data.datas);

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
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" overflowY="auto" maxHeight="650px">
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
              <Th>Activity</Th>
              <Th>Record</Th>
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
              data
                ?.sort((a, b) => {
                  const ra = a.record;
                  const rb = b.record;

                  if (ra > rb) {
                    return -1;
                  }

                  return 1;
                })
                ?.map((e) => (
                  <Tr key={e.id}>
                    <Td>{e.activity}</Td>
                    <Td>{e.record}</Td>
                  </Tr>
                ))
            )}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
}
