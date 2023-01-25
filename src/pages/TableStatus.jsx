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
} from "@chakra-ui/react";
// const shell = require('shelljs')
// import shell from 'shelljs'
// const {exec} = require('child_process')
// import { exec } from "child_process";
// const {spawn}  = require('child_process');

export default function TableStatus() {
  const [datas, setDatas] = useState([])

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('')

  const getData = async () => {
    setLoading(true);
    try {
      const data = await axios.get("/dashboard");
      console.log(data.data.business[0].count)

      setDatas(data.data.business[0].count)
    setLoading(false)
    const msg = await axios.get('/table_business')
    console.log(msg.data.sh)
    setMessage(msg.data.sh)
//     const ls = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

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
              <Th>Table</Th>
              <Th>Status</Th>
              <Th>Log</Th>
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
                <Tr>
                    <Td>TEMP2_DETAIL_BUSINESS_HOURLY</Td>
                    {/* <Td>{datas.business[0].count === 0 ? 'anomaly' : 'normal'}</Td> */}
                    <Td>
                        <Badge colorScheme={datas === 0 ? 'red' : 'green'}>
                            {datas === 0 ? 'anomaly' : 'normal'}
                        </Badge>
                    </Td>
                    <Td>
                        {
                          message
                        }
                    </Td>
                </Tr>
                
            )}
            
          </Tbody>
        </Table>

        
      </Box>
    </div>
  );
}
