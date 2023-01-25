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
  TableContainer,
  Switch
} from "@chakra-ui/react";
import Moment from 'react-moment'

export default function RoleMonica() {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([])
  const [statuses, setStatuses] = useState([])

  const [loading, setLoading] = useState(false);

  const getStatus = async({id_role}) => {
    try {
        const status = await axios.post("/rolemonica/status", {
          id_role
        })

        // return status.statuses
        // setStatuses(status.statuses)
        // console.log(status.data.statuses)
        return status.data.statuses
    } catch (error) {
      console.log(error)
    }
  }

  const getData = async () => {
    setLoading(true);
    try {
      const datas = await axios.get("/applist");
      const role = await axios.get('/rolemonica')

      setData(datas.data.lists);
      setRoles(role.data.datas)
      // let status = []
      // // roles.forEach(async e => {
      // //   const statusscnd = await getStatus(e.id_role)
      // //   // console.log(statusscnd)

      // //   // status.push({
      // //   //   statusscnd
      // //   // })

      // //   // console
      // //   statuses.push({
      // //     statusscnd
      // //   })
      // // console.log(statuses)

      // // })

      // let count = []

      // // while(loading === false){
      //   // for (let i = 0; i < roles.length; i++) {
      //   //   console.log(roles[i])
  
      //   //   const {id_role} = roles[i]
  
      //   //   const statusscnd = await getStatus({
      //   //     id_role
      //   //   })
  
      //   //   console.log(statusscnd)
      //   //   count.push(
      //   //     statusscnd
      //   //   )
  
      //   //   // console.log(count)
      //   // }
      // // }

      // // console.log(count)
      // setStatuses(count)

      // console.log(statuses)
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateBusiness = async(a) => {
    try {
      console.log(a)
    const id_app = data.filter(c => c.app_desc == 'business').map(d => d.id_app)
    console.log(parseFloat(id_app))
    await axios.put('/rolemonica/role', {
      id_app : parseFloat(id_app),
      id_role : b
    })

    getData()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
    // roles.forEach()
    // getStatus()
  }, []);

  return (
    <div className="content">
      {loading ? (
        <Spinner />
      ) : (
    <div className="content">
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" overflowY="auto" maxHeight="650px">
          <TableContainer>
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
              <Th>Role</Th>
              {
                  data.map(e => (
                      <Th>
                          {
                              e.app_desc
                          }
                      </Th>
                  ))
              }
            </Tr>
          </Thead>
          <Tbody>
            {roles?.map((e, idx) => (
                <Tr key={idx}>
                  <Td>{e.role}</Td>
                  {
                    statuses.map(d => {
                      // console.log(d[0])
                      <Td>{d?.statusscnd?.id_role}</Td>
                    })
                  }
                  {/* <Td><Switch defaultChecked={e.business === 'Y' ? true : false} onChange={() => updateBusiness(e.id_role)}/></Td>
                  <Td><Switch defaultChecked={e.activity === 'Y' ? true : false} onChange={() => updateRole(e.id_role)}/></Td>
                  <Td><Switch defaultChecked={e.network === 'Y' ? true : false} onChange={() => updateRole(e.id_role)}/></Td>
                  <Td><Switch defaultChecked={e.cm === 'Y' ? true : false} onChange={() => updateRole(e.id_role)}/></Td>
                  <Td><Switch defaultChecked={e.rpl === 'Y' ? true : false} onChange={() => updateRole(e.id_role)}/></Td>
                  <Td><Switch defaultChecked={e.arcl === 'Y' ? true : false} onChange={() => updateRole(e.id_role)}/></Td>
                  <Td><Switch defaultChecked={e.zscript === 'Y' ? true : false} onChange={() => updateRole(e.id_role)}/></Td>
                  <Td><Switch defaultChecked={e.miniuh === 'Y' ? true : false} onChange={() => updateRole(e.id_role)}/></Td>
                  <Td><Switch defaultChecked={e.rb === 'Y' ? true : false} onChange={() => updateRole(e.id_role)}/></Td>
                  <Td><Switch defaultChecked={e.checkdaemon === 'Y' ? true : false} onChange={() => updateRole(e.id_role)}/></Td>
                  <Td><Switch defaultChecked={e.checkdaemonview === 'Y' ? true : false} onChange={() => updateRole(e.id_role)}/></Td> */}
                </Tr>
              ))
            }
          </Tbody>
        </Table>
        </TableContainer>
      </Box>
    </div>
  )}
  </div>
);
}
