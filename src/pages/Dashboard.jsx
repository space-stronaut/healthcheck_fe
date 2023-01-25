import React, { useEffect, useState } from 'react'

import statusCards from '../assets/JsonData/status-card-data.json' 

import StatusCard from '../../src/components/status-card/StatusCard'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { Box, Skeleton, FormControl, Spinner, FormLabel, TableContainer, Input, HStack, Button, Alert, Accordion, AccordionButton, AccordionIcon, AccordionPanel, AccordionItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import Pdf from 'react-to-pdf'
import moment from 'moment'
const ref = React.createRef();

const Dashboard = () => {
    const [datas, setDatas] = useState([])
    const [loading, setLoading] = useState(true)
    const [arr, setArr] = useState([])
    const [date, setDate] = useState(null)

    const getData = async() => {
        setLoading(true)
        try {
            const data = await axios.get('/dashboard')

            setDatas(data.data)
            setLoading(false)
            const empty = []
            // console.log(datas.dateDb[0].updatedAt)
            empty.push(moment(data.data.dateDb[0].updatedAt).format('YYYY-MM-D HH:mm'))
            empty.push(moment(data.data.dateTc[0].updatedAt).format('YYYY-MM-D HH:mm'))
            empty.push(moment(data.data.dateCpu[0].updatedAt).format('YYYY-MM-D HH:mm'))
            empty.push(moment(data.data.dateStorage[0].updatedAt).format('YYYY-MM-D HH:mm'))
            setArr(empty.sort())
            // setArr(Array.prototype.push(datas.dateTc[0].updatedAt))
            console.log(arr[3])
            console.log(empty)
            // setDate(arr[3])
            // console.log(date)
            // console.log(empty)
        } catch (error) {
            
        }
    }

    const [reset, setReset] = useState(false)

    // const [auth, setAuth] = useRecoilState(authenticated)
    const [search, setSearch] = useState(moment().format('YYYY-MM-D'))

    const searching = async() => {
        setLoading(true)
        try {
            const response = await axios.post('/dashboard/search', {
                date : search.toString()
            })

            console.log(response)
            setDatas(response.data)
            setReset(true)
            setLoading(false)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getData()
        // console.log(datas.db)
    }, [])

    return (
            <div>
            <h2 className='page-header'>Dashboard</h2>
            <h2 className='page-header'>Last Update : { 
                loading === true ? (
                    <Spinner /> 
                ) : arr[3] 
            }</h2>
            <Box p={4} borderWidth='1px' marginBottom={'10'} borderRadius='lg' overflow='hidden'>
            {
                reset === true ? (
                    <Alert status='success' variant='left-accent'>
                        Result : { search }
                    </Alert>
                ) : ""
            }
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
                            <Input type={'date'} value={search} onChange={e => setSearch(e.target.value)}/>
                            </HStack >
                            <HStack spacing={'13'} marginTop={'5'}>
                            <Button colorScheme={'red'} onClick={searching}>
                            Search
                        </Button>
                        {reset === true ? (
                        <Button colorScheme={'red'} onClick={() => {
                            setReset(!reset)
                            getData()
                            setSearch(moment().format('YYYY-MM-D'))
                        }}>
                            Reset
                        </Button>
                    ) : ''}
                            </HStack>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    
                </FormControl>
            </Box>
            <div className="row">
            
                {/* <>
                    {
                        loading === false ? (
                            <div className="col-3">
                                    <StatusCard
                                        icon={'bx bx-chip'}
                                        count={datas === null ? 'No Data' : datas[8].status}
                                        title={datas[8].category === null ? datas[8].category : datas[8].category}
                                        link={'/appcpu'}
                                    />
                                </div>
                        ) : (
                            <>
                        )
                    }
                                 */}
                {/* </> */}
                {
                    loading === false ? (
                        <>
                            <div className="col-3" ref={ref}>
                                    <StatusCard
                                        icon={'bx bx-data'}
                                        count={datas.db === 0 ? 'normal' : 'anomaly'}
                                        title="Summary DB"
                                        link="/summarydb"
                                        update={moment(datas.dateDb[0].updatedAt).format('YYYY-MM-D HH:mm')}
                                    />
                            </div>

                            <div className="col-3">
                                <StatusCard
                                    icon={'bx bx-hdd'}
                                    count={datas.storage === 0 ? 'normal' : 'anomaly'}
                                    title="Summary Storage IOPS"
                                    link={'/summarystorage'}
                                    update={moment(datas.dateIops[0].updatedAt).format('YYYY-MM-D HH:mm')}
                                />
                            </div>

                            <div className="col-3">
                                <StatusCard
                                    icon={'bx bx-hdd'}
                                    count={datas.environment === 0 ? 'normal' : 'anomaly'}
                                    title="Storage Environment"
                                    link={'/summarystorage'}
                                    update={moment(datas.dateEvr[0].updatedAt).format('YYYY-MM-D HH:mm')}
                                />
                            </div>

                            <div className="col-3">
                                <StatusCard
                                    icon={'bx bx-line-chart'}
                                    count={datas.tc === 0 ? 'normal' : 'anomaly'}
                                    title="Summary Tc Dashboard"
                                    link={'/summarytc'}
                                    update={moment(datas.dateTc[0].updatedAt).format('YYYY-MM-D HH:mm')}
                                />
                            </div>

                            <div className="col-3">
                                <StatusCard
                                    icon={'bx bx-layout'}
                                    count={datas.monica === 0 ? 'normal' : 'anomaly'}
                                    title="Monica CPU"
                                    link={'/appcpu'}
                                    update={moment(datas.dateMonica[0].updatedAt).format('YYYY-MM-D HH:mm')}
                                />
                            </div>

                            <div className="col-3">
                                <StatusCard
                                    icon={'bx bx-layout'}
                                    count={datas.marcela === 0 ? 'normal' : 'anomaly'}
                                    title="Marcela CPU"
                                    link={'/appcpu'}
                                    update={moment(datas.dateMarcela[0].updatedAt).format('YYYY-MM-D HH:mm')}
                                />
                            </div>

                            <div className="col-3">
                                <StatusCard
                                    icon={'bx bx-chip'}
                                    count={datas.fr === 0 ? 'normal' : 'anomaly'}
                                    title="CPU FR"
                                    link={'/appcpu'}
                                    update={moment(datas.dateFr[0].updatedAt).format('YYYY-MM-D HH:mm')}
                                />
                            </div>

                            <div className="col-3">
                                <StatusCard
                                    icon={'bx bx-chip'}
                                    count={datas.rb === 0 ? 'normal' : 'anomaly'}
                                    title="CPU RB"
                                    link={'/appcpu'}
                                    update={moment(datas.dateRb[0].updatedAt).format('YYYY-MM-D HH:mm')}
                                />
                            </div>

                            <div className="col-3">
                                <StatusCard
                                    icon={'bx bx-chip'}
                                    count={datas.rpl === 0 ? 'normal' : 'anomaly'}
                                    title="CPU RPL"
                                    link={'/appcpu'}
                                    update={moment(datas.dateRpl[0].updatedAt).format('YYYY-MM-D HH:mm')}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="col-3">
                                <Skeleton />
                            </div>
                    )
                }
                    
                </div>
        </div>
    )
}

export default Dashboard