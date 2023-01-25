import React, { useState, useEffect, useRef } from "react";
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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  HStack,
  Input,
  FormControl,
  Button,
  Center,
} from "@chakra-ui/react";
import moment from "moment";
import { DownloadTableExcel, useDownloadExcel, downloadExcel } from 'react-export-table-to-excel';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


function Report() {
  const tableRef = useRef(null)
  // const [datas, setDatas] = useState([]);

  // const [date, setDate] = useState([]);

  // const [count, setCount] = useState([]);

  // const [loading, setLoading] = useState(false);

  // const getCount = async ({ user, date }) => {
  //   try {
  //     const datas = await axios.post("/report-user/count", {
  //       user,
  //       date,
  //     });

  //     return datas?.data?.datas?.[0]?.count;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const getData = async () => {
  //   setLoading(true);
  //   try {
  //     const datas = await axios.get("/report-user");

  //     const userData = datas?.data?.datas;

  //     let end = new Date("2022-12-23");

  //     let start = new Date("2022-12-16");

  //     let dateData = [];

  //     let countData = [];

  //     while (start <= end) {
  //       const dateFormat = moment(start).format("YYYY-MM-DD");

  //       dateData.push(dateFormat);

  //       for (let i = 0; i < userData?.length; i++) {
  //         const { user } = userData[i];

  //         const count = await getCount({ user, date: dateFormat });

  //         countData.push({
  //           user,
  //           count,
  //           date: dateFormat,
  //         });
  //       }

  //       start.setDate(start.getDate() + 1);
  //     }

  //     setDatas(userData);

  //     setDate(dateData);

  //     setCount(countData);

  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const [mulai, setMulai] = useState(null)
  const [selesai, setSelesai] = useState(null)
  const [submit, setSubmit] = useState(false)

  const handleSubmit = () => {
    // setSubmit(false)
    setSubmit(true)
  }

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="content">
      <h2 className='page-header'>Report User Monica</h2>
      <Box p={4} borderWidth='1px' marginBottom={'10'} borderRadius='lg' overflow='hidden'>
            <FormControl>
                    <Accordion defaultIndex={[1]} allowMultiple>
                        <AccordionItem>
                            <h2>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    Viewing
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                            <HStack spacing={'24'}>
                            <Input type={'date'} value={mulai} onChange={e => setMulai(e.target.value)}/>
                            <Input type={'date'} value={selesai} onChange={e => setSelesai(e.target.value)}/>
                            </HStack >
                            <HStack spacing={'13'} marginTop={'5'}>
                            {/* <Button colorScheme={'red'}  onClick={handleSubmit}>
                            Search
                        </Button> */}
                        {submit === true ? (
                        <Button colorScheme={'red'} onClick={() => setSubmit(false)}>
                            Reset
                        </Button>
                    ) : (
                      <Button colorScheme={'red'}  onClick={handleSubmit}>
                            Search
                        </Button>
                    )}
                            </HStack>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    
                </FormControl>
            </Box>

            {
              submit === true ? (
                <ReportUser mulai={mulai} selesai={selesai} />
              ) : (<Center>Your Data Will Appear Here...</Center>)
            }
    </div>
  );
}
// const tableRef = useRef(null);
function ReportUser({mulai, selesai}) {
  const [datas, setDatas] = useState([]);
  const tableRef = useRef(null);
  const [date, setDate] = useState([]);
  const [name, setName] = useState("")

  const [count, setCount] = useState([]);

  const [loading, setLoading] = useState(false);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users"
  });

  const getCount = async ({ user, date }) => {
    try {
      const datas = await axios.post("/report-user/count", {
        user,
        date,
      });

      return datas?.data?.datas?.[0]?.count;
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    // const tableRef = useRef(null);
    setLoading(true);
    try {
      const datas = await axios.get("/report-user");
      let random = "REQ" + Math.floor(Math.random() * 1000000000000000000) + 1;

      const userData = datas?.data?.datas;

      let end = new Date(selesai);

      let start = new Date(mulai);

      let dateData = [];

      let countData = [];

      while (start <= end) {
        const dateFormat = moment(start).format("YYYY-MM-DD");

        dateData.push(dateFormat);

        for (let i = 0; i < userData?.length; i++) {
          const { user } = userData[i];

          const count = await getCount({ user, date: dateFormat });

          countData.push({
            user,
            count,
            date: dateFormat,
          });

          // date.forEach(async (tanggal) => {
          //   await axios.post("/report-user/insert", {
          //     user : user,
          //     count : count,
          //     tanggal : tanggal,
          //     req_id : random
          //   })
          // });
        }

        start.setDate(start.getDate() + 1);
      }

      setDatas(userData);

      setDate(dateData);

      setCount(countData);

      setLoading(false);
      setName(`Recon User Monica Access History Period ${moment(mulai).format('MMMM Do YYYY')} - ${moment(selesai).format('MMMM Do YYYY')}`)
      console.log(tableRef)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="content">
      {/* <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                />

                   <> Export excel </button> */}
      {loading ? (
        <Spinner />
      ) : (
        <>
        <Button colorScheme={'green'} marginBottom={10}>
        <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename={name}
                    sheet="Raw Sheet"
                    buttonText="Download as XLS"/>
        </Button>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
          <TableContainer>
            
            <Table
              variant="simple"
              size={"lg"}
              width="100%"
              style={{
                width: "100%",
              }}
              colorScheme={"facebook"}
              id="table-to-xls"
              // ref={tableRef}
            >
              <Thead position="sticky" top={0} bgColor="white" zIndex={3}>
                <Tr>
                  <Th>Date</Th>
                  {datas.map((e) => (
                    <Th>{e.user}</Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {date?.map((date, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{date}</Td>
                      {datas.map((e) => {
                        const c = count?.filter(
                          (co) => co.date === date && co.user === e.user
                        );

                        // console.log(c);

                        return <Td>{c?.[0]?.count}</Td>;
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        </>
      )}
    </div>
    
  );
}

export default Report;
