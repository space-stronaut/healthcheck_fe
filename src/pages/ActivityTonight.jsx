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

export default function ActivityTonight() {
  const [datas, setDatas] = useState([])

  const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('')

  const getData = async () => {
    setLoading(true);
    try {
      const data = await axios.get("/activity_tonight");
      console.log(data.data.activities)

      setDatas(data.data.activities[0])
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
              <Th>Date</Th>
              <Th>CRQ Number</Th>
              <Th>Subject Email</Th>
              <Th>Type</Th>
              <Th>Activity Name</Th>
              <Th>Area</Th>
              <Th>Status</Th>
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
                        {e.crq_number}
                    </Td>
                    <Td>
                        {e.subject_email}
                    </Td>
                    <Td>
                        {e.TYPE}
                    </Td>
                    <Td>
                        {e.activity_name}
                    </Td>
                    <Td>
                        {e.AREA}
                    </Td>
                    <Td>
                        <Badge colorScheme={'blue'}>
                            {e.statusdesc}
                        </Badge>
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
