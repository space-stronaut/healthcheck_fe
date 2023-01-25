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
import Moment from 'react-moment'

export default function ReconUser() {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const datas = await axios.get("/reconuser");

      setData(datas.data.recon);

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
          size={"md"}
          width="100%"
          style={{
            width: "100%",
          }}
          colorScheme={"facebook"}
        >
          <Thead position="sticky" top={0} bgColor="white" zIndex={3}>
            <Tr>
              <Th>User</Th>
              <Th>Role</Th>
              <Th>
                  DateTime Login
              </Th>
              <Th>
                  Version
              </Th>
              <Th>
                  DateTime Activity
              </Th>
              <Th>
                  Activity
              </Th>
              <Th>
                  View DateTime
              </Th>
              <Th>
                  Menu
              </Th>
              <Th>
                  Sub Menu
              </Th>
              <Th>
                  Tab
              </Th>
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
                  <Td>{e.user}</Td>
                  <Td>{e.role}</Td>
                  <Td><Moment format="MMMM Do YYYY HH:mm:ss">
                      {e.datetime_login}
                      </Moment>
                  </Td>
                  <Td>
                      {e.version}
                  </Td>
                  <Td><Moment format="MMMM Do YYYY HH:mm:ss">
                      {e.datetime_activity}
                      </Moment>
                  </Td>
                  <Td>
                      {e.activity}
                  </Td>
                  <Td><Moment format="MMMM Do YYYY HH:mm:ss">
                      {e.view_datetime}
                      </Moment>
                  </Td>
                  <Td>
                      {e.menu}
                  </Td>
                  <Td>
                      {e.sub_menu}
                  </Td>
                  <Td>
                      {e.tab}
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
}
