import React, {useEffect, useState} from 'react'
import Moment from 'react-moment'
import axios from 'axios'
import { Slide } from 'react-slideshow-image';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Center,
    ModalFooter,
    ModalBody,
    Select,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    TableContainer,
    ModalCloseButton,
    useDisclosure,
    Button,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Input,
    FormLabel,
    Spinner,
    Tr,
    Th,
    Td,
    TableCaption,
    FormControl,
    Stack,
    HStack,
    useToast,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Box,
    Badge,
    Alert,
    Grid
  } from '@chakra-ui/react'
import { RMIUploader } from 'react-multiple-image-uploader';
import { useRecoilState } from 'recoil';
import { authenticated } from '../store/authStore';


export default function SummaryDb(){
    const [visible, setVisible] = useState(true)
    const toast = useToast()
    const { 
        isOpen : isDeleteOpen, 
        onOpen : onDeleteOpen, 
        onClose : onDeleteClose 
    } = useDisclosure()
    const {
        isOpen : isEvidenceOpen,
        onOpen : onEvidenceOpen,
        onClose : onEvidenceClose
    } = useDisclosure()
    const cancelRef = React.useRef()
    const [data, setData] = useState([])
    const [site, setSite] = useState('')
    const [date, setDate] = useState(null)
    const [time, setTime] = useState('')
    const [images, setImages] = useState([])
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState(null)
    const [submitLoading, setSubmitLoading] = useState(false)
    const { 
        isOpen : isFormOpen, 
        onOpen : onFormOpen,  
        onClose : onFormClose
    } = useDisclosure()
    const [id, setId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [item, setItem] = useState('')

    const handleSetVisible = () => {
        setVisible(true);
      };
      const hideModal = () => {
        setVisible(false);
      };

    const onUpload = async(data) => {
        try {
          await axios.post('/imagedb/' + id,{
            data
          })
          getData()
          onEvidenceClose()
          toast({
              title : "Uploading Success",
              position : 'top-right',
              status : 'success',
              duration : 2000,
              isClosable : true
          })
          setId(null)
        } catch (error) {
          
        }
      };
      const onSelect = (data) => {
        console.log("Select files", data);
      };
      const onRemove = (id) => {
        console.log("Remove image id", id);
      };

    const getData = async() => {
        setLoading(true)
        try{
            const datas = await axios.get('/summarydb')

            console.log(datas)
            setData(datas.data.summariesdb)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }



    const handleSubmit = async(e) => {
        e.preventDefault()
        setSubmitLoading(true)
        try {
            await axios.post('/summarydb', {
                site,
                date,
                time,
                status,
                notes
            })

            // console.log(resolution)

            toast({
                title: 'Record created.',
                position : 'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
              setSite("")
              setDate(null)
              setTime('')
              setStatus('')
              setNotes(null)
              setId(null)
              setSubmitLoading(false)

            onFormClose()

            getData()
        } catch (error) {
            alert('error')
            setSubmitLoading(false)
        }
    }

    const handleDelete = async(e) => {
        try{
            await axios.delete('/summarydb/delete/' + e)

            getData()

            console.log(e)

            toast({
                title: 'Issue Deleted.',
                position : 'top-right',
                status: 'error',
                duration: 2000,
                isClosable: true,
              })
        }catch(e) {
            throw Error(e)
        }
    }

    const handleEdit = async(e) => {
        try {
            onFormOpen()
            console.log(e)
            setSite(e.site)
              setDate(e.date)
              setTime(e.time)
              setStatus(e.status)
              setNotes(e.notes)
              setId(e.id)
        } catch (error) {
            
        }
    }

    // if (onClose()) {
    //     setTitle('')
    // }

    const handleUpdate = async(e) => {
        e.preventDefault()
        try {
            await axios.put('/summarydb/update/' + id, {
                site,
                date,
                time,
                status,
                notes
            })

            // console.log(resolution)

            toast({
                title: 'Issue updated.',
                position : 'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })

              setSite("")
              setDate(null)
              setTime('')
              setStatus('')
              setNotes(null)
              setId(null)
              getData()
            onFormClose()
        } catch (error) {
            
        }
    }

    const handleShow = async(e) => {
        try {
            setId(e)
            const response = await axios.get('/imagedb/' + e)
            setImages(response.data.datas)
            onEvidenceOpen()
        } catch (error) {
            
        }
    }

    const [reset, setReset] = useState(false)

    const [auth, setAuth] = useRecoilState(authenticated)
    const [start, setStart] = useState(moment().format('YYYY-MM-D'))
    const [end, setEnd] = useState(moment().format('YYYY-MM-D'))

    const search = async() => {
        setLoading(true)
        try {
            const response = await axios.post('/summarydb/date', {
                start ,
                end
            })

            console.log(response)
            setData(response.data.summariesdb)
            setReset(!reset)
            setLoading(false)
        } catch (error) {
            
        }
    }

    const getFilter = async() => {
        try {
            const data = await axios.get('/summarydb')

            console.log(data.data.summariesdb.filter(e => e.site === "All Site"))
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getData()
        getFilter()
    }, []);

    // const [auth, setAuth] = useRecoilState(authenticated)

    return (
        <div className="content">
            <Box p={4} borderWidth='1px' marginBottom={'10'} borderRadius='lg' overflow='hidden' css={{
                    background : 'white'
                }}>
            <FormControl>
                    <Accordion defaultIndex={[1]} allowMultiple >
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
                                <Input type={'date'} value={start} onChange={e => setStart(e.target.value)}/>
                                <Input type={'date'} value={end} onChange={e => setEnd(e.target.value)}/>
                            </HStack >
                            <HStack spacing={'13'} marginTop={'5'}>
                                <Button colorScheme={'red'} onClick={search}>
                                    Search
                                </Button>
                                {reset === true ? (
                                <Button colorScheme={'red'} onClick={() => {
                                    setReset(!reset)
                                    getData()
                                    setStart(moment().format('YYYY-MM-D'))
                                    setEnd(moment().format('YYYY-MM-D'))
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
            {
                auth.auth === true ? (
                    auth.data.role === 'internal' ? (
                        <Button onClick={onFormOpen} colorScheme={'red'} marginTop={'10'} marginBottom={'10'}>Create Record</Button>
                    ) : ''
                ) : ''
            }
            <Box borderWidth='1px' borderRadius='lg' overflow='hidden' overflowY="auto" maxHeight="500px">
            <Box>
            {
                reset === true ? (
                    <Alert status='success' variant='left-accent'>
                        Result : { start } to {end}
                    </Alert>
                ) : ""
            }
            </Box>
            <TableContainer>
            <Table size={'lg'} width="100%" style={{
                'width' : '100%'
            }}
                css={{
                    background : 'white'
                }}
            >
            <Thead position="sticky" top={0} bgColor="white" zIndex={3}>
                <Tr>
                <Th>#</Th>
                <Th>Site</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Status</Th>
                <Th>Notes</Th>
                <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody css={{
                    background : 'white'
                }}>
                    { 
                        loading === true ? (
                            <Tr>
                                <Td colSpan={3}>
                                    <Spinner />
                                </Td>
                            </Tr>
                        ) : (
                            data?.map((e,index) => (
                                <Tr key={e.id}>
                                <Th>
                                    {
                                        index + 1
                                    }
                                </Th>
                                <Td>{
                                    e.site
                                }</Td>
                                <Td><Moment format='MMMM Do YYYY'>{
                                    e.date
                                }</Moment></Td>
                                <Td>{
                                    e.time  
                                }</Td>
                                <Td><Badge colorScheme={e.status === 'normal' ? 'green' : 'red'}>
                                    {
                                        e.status
                                    }</Badge>
                                </Td>
                                <Td>
                                    {
                                        e.notes
                                    }
                                </Td>
                                {
                                    auth.auth === true ? (
                                        auth.data.role === 'internal' ? (
                                            <Td>
                                                <HStack spacing={'24px'}>
                                                    <Button colorScheme={'green'} onClick={() => handleEdit(e)}>Edit</Button>
                                                    <Button colorScheme='red' onClick={() => {
                                                        onDeleteOpen()
                                                        setId(e.id)
                                                    }}>
                                                        Delete
                                                    </Button>
                                                    <Button colorScheme={'red'} onClick={() => handleShow(e.id)}>
                                                    <i class='bx bxs-image bx-tada bx-flip-horizontal' ></i>
                                                    </Button>
                                                </HStack>
                                            </Td>
                                        ) : <Td>
                                        <Button colorScheme={'red'} onClick={() => handleShow(e.id)}>
                                                <i class='bx bxs-image bx-tada bx-flip-horizontal' ></i>
                                                </Button>
                                    </Td>
                                    ) : ''
                                }
                                </Tr>
                            ))
                        )
                    }
            </Tbody>
            </Table>
            </TableContainer>
            </Box>

            <Modal isOpen={isFormOpen} onClose={() => {
                onFormClose()
                setSite("")
              setDate(null)
              setTime('')
              setStatus('')
              setNotes(null)
              setId(null)
            }} 
                size="xl"
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{ id !== null ? 'Update' : "Create" } Record</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={id !== null ? handleUpdate : handleSubmit}>
                        <FormControl>
                            <FormLabel htmlFor='email'>Site</FormLabel>
                            <Select placeholder='Choose Site...' onChange={e => setSite(e.target.value)}>
                            <option value="All Site" selected={site === 'All Site'}>All Site</option>
                                <option value="TBS" selected={site === 'TBS'}>TBS</option>
                                <option value="MKS" selected={site === 'MKS'}>MKS</option>
                                <option value="SRB" selected={site === 'SRB'}>SRB</option>
                                <option value="PKB" selected={site === 'PKB'}>PKB</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Date</FormLabel>
                            <Input id='email' type='date' value={date} onChange={(e) => setDate(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Time</FormLabel>
                            <Input id='email' type='time' value={time} onChange={(e) => setTime(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Status</FormLabel>
                            <Select placeholder='Choose Status' onChange={(e) => setStatus(e.target.value)}>
                                <option value="normal" selected={status === 'normal'}>Normal</option>
                                <option value="anomaly" selected={status === 'anomaly'}>Anomaly</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Notes</FormLabel>
                            <Input id='email' type='text' value={notes} onChange={(e) => setNotes(e.target.value)}/>
                        </FormControl>
                        <Stack spacing={3} marginTop={'10'}>
                            <Button type='submit' colorScheme={'red'} size={'lg'}>
                                {
                                    submitLoading === true ? (
                                        <Spinner /> 
                                    ) : "Submit"
                                }
                            </Button>
                        </Stack>
                    </form>
                </ModalBody>

            </ModalContent>
            </Modal>

            {/* Evidence */}
            <Modal isOpen={isEvidenceOpen} onClose={() => {
                onEvidenceClose()
                setSite("")
                setDate(null)
                setTime('')
                setStatus('')
                setNotes(null)
                setId(null)
                setImages([])
            }} 
                size="full"
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Evidence</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                {
                auth.auth === true ? (
                    auth.data.role === 'internal' ? (
                        <RMIUploader 
                        isOpen={visible}
                        hideModal={hideModal}
                        onSelect={onSelect}
                        onUpload={onUpload}
                        onRemove={onRemove}
                    />
                    ) : ''
                ) : ''
            }
            {
                images.length > 1 ? (
                <div className="slide-container">
                        <Slide>
                        {images.map((e, index)=> (
                            <div className="each-slide" key={index}>
                            {/* <div style={{'backgroundImage': `url(${e.evidence_img})`}}>
                                <span>Hello</span>
                            </div> */}
                            <img src={ e.image_db } alt="" />
                            </div>
                        ))} 
                        </Slide>
                    </div>
                ) : <>
                    {images.map((e, index)=> (
                        <div className="each-slide" key={index}>
                        {/* <div style={{'backgroundImage': `url(${e.evidence_img})`}}>
                            <span>Hello</span>
                        </div> */}
                        <img src={ e.image_db } alt="" />
                        </div>
                    ))} 
                </>   
            }

                </ModalBody>

            </ModalContent>
            </Modal>

            <AlertDialog
                isOpen={isDeleteOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => {
                    onDeleteClose()
                    setId(null)
                }}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete Action
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onDeleteClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={() => {
                        onDeleteClose()
                        handleDelete(id)
                    }} ml={3}>
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    )
}