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
import * as XLSX from "xlsx";

export default function TopTenUser({apiData, fileName}) {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([])
  const exportToCSV = async(apiData, fileName) => {
    const response = await axios.get('/toptenuser')
    console.log(response.data.datas)
    setDatas(response.data.topTenUser)
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(datas)

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    XLSX.writeFile(wb, "MyFile.xlsx")
  };

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const datas = await axios.get("/toptenuser");

      setData(datas.data.topTenUser);

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
      {/* <button onClick={(e) => exportToCSV(apiData, fileName)}>Export</button> */}
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
              <Th>User</Th>
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
              data?.map((e, idx) => (
                <Tr key={idx}>
                  <Td>{e.account}</Td>
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
