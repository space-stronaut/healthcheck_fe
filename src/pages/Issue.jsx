import React, {useEffect, useState} from 'react'
import Moment from 'react-moment'
import axios from 'axios'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    TableContainer,
    Alert,
    Flex,
    Container,
    useDisclosure,
    Margin,
    Grid,
    Center,
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
    Text,
    AlertDialogOverlay,
    Box,
    Badge,
    Select,
    Checkbox,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
  } from '@chakra-ui/react'
import { RMIUploader } from 'react-multiple-image-uploader';
import moment from 'moment';
import {useRecoilState} from 'recoil'
import {authenticated} from '../store/authStore'
// import {Collapse} from "@chakra-ui/collapse"


export default function Issue(){
    const [visible, setVisible] = useState(true)
    const toast = useToast()
    const { 
        isOpen : isDeleteOpen, 
        onOpen : onDeleteOpen, 
        onClose : onDeleteClose 
    } = useDisclosure()

    const { 
        isOpen : isDetailOpen, 
        onOpen : onDetailOpen, 
        onClose : onDetailClose 
    } = useDisclosure()
    
    const {
        isOpen : isEvidenceOpen,
        onOpen : onEvidenceOpen,
        onClose : onEvidenceClose
    } = useDisclosure()
    const cancelRef = React.useRef()
    const [data, setData] = useState([])
    const [title, setTitle] = useState('')
    const [date, setDate] = useState(null)
    const [problem, setProblem] = useState('')
    const [images, setImages] = useState([])
    const [rca, setRca] = useState('')
    const [rate, setRate] = useState(null)
    const [resolution, setResolution] = useState('')
    const [status, setStatus] = useState('')
    const [time, setTime] = useState(null)
    const [check, setCheck] = useState([])
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
          await axios.post('/evidence/' + id,{
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
            const datas = await axios.get('/issue')

            console.log(datas)
            setData(datas.data.issue)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }



    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await axios.post('/issue', {
                title : title,
                date : date,
                problem_description : problem,
                rca : rca,
                success_rate : rate,
                action_item : item,
                problem_resolution : resolution,
                time : time,
                status
            })

            console.log(resolution)

            toast({
                title: 'Issue created.',
                position : 'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
              setTitle("")
              setDate(null)
              setProblem('')
              setRca('')
              setRate(null)
              setTime(null)
              setId(null)
              setItem('')
              setResolution('')
              setStatus('')

            onFormClose()

            getData()
        } catch (error) {
            alert('error')
        }
    }

    const handleDelete = async(e) => {
        try{
            await axios.delete('/issue/delete/' + e)

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
            setTitle(e.title)
            setDate(e.date)
            setProblem(e.problem_description)
            setRca(e.rca)
            setRate(e.success_rate)
            setId(e.id)
            setTime(e.time)
            setItem(e.action_item)
            setResolution(e.problem_resolution)
            setStatus(e.status)
        } catch (error) {
            
        }
    }

    // if (onClose()) {
    //     setTitle('')
    // }

    const handleUpdate = async(e) => {
        e.preventDefault()
        try {
            await axios.put('/issue/update/' + id, {
                title : title,
                date : date,
                problem_description : problem,
                rca : rca,
                success_rate : rate,
                action_item : item,
                time : time,
                problem_resolution : resolution,
                status
            })

            console.log(resolution)

            toast({
                title: 'Issue updated.',
                position : 'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })

              setTitle("")
              setDate(null)
              setProblem('')
              setRca('')
              setRate(null)
              setTime(null)
              setId(null)
              setItem('')
              setResolution('')
              setStatus('')
              getData()
            onFormClose()
        } catch (error) {
            
        }
    }

    const [imageLoading, setImageLoading] = useState(false)

    const handleDetail = async(e) => {
        setImageLoading(e.id)
        try {
            console.log(e)
            setTitle(e.title)
            setDate(e.date)
            setProblem(e.problem_description)
            setRca(e.rca)
            setRate(e.success_rate)
            setId(e.id)
            setTime(e.time)
            setItem(e.action_item)
            setResolution(e.problem_resolution)
            setStatus(e.status)
            const response = await axios.get('/evidence/' + e.id)
            setImages(response.data.datas)
            setImageLoading(false)
            imageLoading === false ? onDetailOpen() : ''
            // setLoading(false)
        } catch (error) {
            
        }
    }

    const handleShow = async(e) => {
        try {
            setId(e)
            const response = await axios.get('/evidence/' + e)
            setImages(response.data.datas)
            onEvidenceOpen()
        } catch (error) {
            
        }
    }

    const handleView = async(e) => {
        setLoading(true)
        try {
            const response = await axios.post('/issue/search', {
                view : e
            })

            console.log(response)
            setData(response.data.issue[0])
            setLoading(false)
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
            const response = await axios.post('/issue/date', {
                start ,
                end
            })

            console.log(response)
            setData(response.data.issue)
            setReset(true)
            setLoading(false)
        } catch (error) {
            
        }
    }

    const [show, setShow] = React.useState(false);

    const handleToggle = () => {
        setShow(!show)
        console.log(show)
    };

    const [checked, setChecked] = useState([])

    const handleCheck = (e) => {
        setChecked([...checked, e])
        console.log(checked)
    }

    // const { isOpen : isCollapseOpen, onToggle : onCollapseOpen } = useDisclosure()

    useEffect(() => {
        getData()
    }, []);

    return (
        <div className="content">
            <Box p={4} borderWidth='1px' marginBottom={'10'} borderRadius='lg' overflow='hidden'>
            <Button colorScheme={'green'} marginBottom={10}>
        <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="List Issue WA TC Daily"
                    sheet="Raw Sheet"
                    buttonText="Download as XLS"/>
        </Button>
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
                        <Button onClick={onFormOpen} marginBottom={'10'} colorScheme={'red'}>Create Issue</Button>
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
            {/* <Moment format='MMMM Do YYYY'>{
                Date.now()    
            }</Moment> */}
            {
                
            }
            </Box>
            <TableContainer>
            <Table variant='simple' size={'lg'} width="100%" style={{
                'width' : '100%'
            }} colorScheme={'facebook'} id="table-to-xls">
            <Thead position="sticky" top={0} bgColor="white" zIndex={3}>
                <Tr>
                <Th>#</Th>
                <Th>Title</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>
                    Status
                </Th>
                <Th>Problem Description</Th>
                {/* <Th>Action Item</Th> */}
                <Th>Problem Resolution</Th>
                <Th>Root Cause</Th>
                <Th>Action</Th>
                </Tr>
            </Thead>
            <Tbody>
                    { 
                        loading === true ? (
                            <Tr>
                                <Td colSpan={3}>
                                    <Spinner />
                                </Td>
                            </Tr>
                        ) : (
                            data?.map((e, index) => (
                                <Tr key={e.id}>
                                <Td>
                                    {
                                        index + 1
                                    }
                                </Td>
                                <Td>{
                                    e.title 
                                }</Td>
                                <Td><Moment format='MMMM Do YYYY'>{
                                    e.date
                                }</Moment></Td>
                                <Td>
                                    {e.time}
                                </Td>
                                <Td><Badge colorScheme={e.status.toLowerCase() === 'solved' ? 'green' : 'yellow'}>
                                    {
                                        e.status
                                    }
                                    </Badge>
                                </Td>
                                <Td>{
                                    e.problem_description     
                                }</Td>
                                {/* <Td>
                                    <div dangerouslySetInnerHTML={{ __html: e.action_item  }} />
                                </Td> */}
                                <Td>
                                    <div dangerouslySetInnerHTML={{ __html: e.problem_resolution  }} />
                                </Td>
                                <Td>
                                    { e.rca }
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
                                                    <Button colorScheme={'teal'} onClick={() => handleDetail(e)}>
                                                    {
                                                            imageLoading === e.id ? (
                                                                <Spinner />
                                                            ) : "Detail"
                                                        }
                                                    </Button>
                                                    <Td>
                                            <Button colorScheme={'red'} onClick={() => handleShow(e.id)}>
                                                    <i class='bx bxs-image bx-tada bx-flip-horizontal' ></i>
                                                    </Button>
                                        </Td>
                                                </HStack>
                                            </Td>
                                        ) : <Td>
                                        <Button colorScheme={'teal'} onClick={() => handleDetail(e)}>
                                                        {
                                                            imageLoading === e.id ? (
                                                                <Spinner />
                                                            ) : "Detail"
                                                        }
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
                setTitle("")
                setDate(null)
                setProblem('')
                setRca('')
                setRate(null)
                setId(null)
                setItem('')
                setStatus('')
                setResolution('')
                setTime(null)
            }} 
                size="xl"
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{ id !== null ? 'Update' : "Create" } Issue</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={id !== null ? handleUpdate : handleSubmit}>
                        <FormControl>
                            <FormLabel htmlFor='email'>Issue Title</FormLabel>
                            <Input id='email' type='text' value={title} onChange={(e) => setTitle(e.target.value)} isRequired/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Date</FormLabel>
                            <Input id='email' type='date' value={date} onChange={(e) => setDate(e.target.value)} isRequired/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Time</FormLabel>
                            <Input id='email' type='time' value={time} onChange={(e) => setTime(e.target.value)} isRequired/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Problem Description</FormLabel>
                            <Input id='email' type='text' value={problem} onChange={(e) => setProblem(e.target.value)} isRequired/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>RCA</FormLabel>
                            <Input id='email' type='text' value={rca} onChange={(e) => setRca(e.target.value)} isRequired/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Success Rate</FormLabel>
                            <Input id='email' type='number' value={rate} onChange={(e) => setRate(e.target.value)} isRequired/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='action_item'>Action Item</FormLabel>
                            <CKEditor
                                data={item}
                                editor={ ClassicEditor }
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                    editor.editing.view.change((writer) => {
                                        writer.setStyle(
                                            "height",
                                            "200px",
                                            editor.editing.view.document.getRoot()
                                        );
                                        });
                                } }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setItem(data)
                                    console.log( { event, editor, data } );
                                } }
                                onBlur={ ( event, editor ) => {
                                    console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    console.log( 'Focus.', editor );
                                } }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='action_item'>Problem Resolution</FormLabel>
                            <CKEditor
                                data={resolution}
                                editor={ ClassicEditor }
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                    editor.editing.view.change((writer) => {
                                        writer.setStyle(
                                            "height",
                                            "200px",
                                            editor.editing.view.document.getRoot()
                                        );
                                        });
                                } }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    setResolution(data)
                                    console.log( { event, editor, data } );
                                } }
                                onBlur={ ( event, editor ) => {
                                    console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    console.log( 'Focus.', editor );
                                } }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='status'>Status</FormLabel>
                            <Select placeholder='Choose Status' value={status} onChange={e => setStatus(e.target.value)}>
                                <option value='solved' selected={status === 'solved'}>Solved</option>
                                <option value='need rca' selected={status === 'need rca'}>Need RCA</option>
                                <option value='need fix' selected={status === 'need fix'}>Need FIX</option>
                            </Select>
                        </FormControl>
                        <Stack spacing={3} marginTop={'10'}>
                            <Button type='submit' colorScheme={'red'} size={'lg'}>
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </ModalBody>

            </ModalContent>
            </Modal>

            {/* Evidence */}
            <Modal isOpen={isEvidenceOpen} onClose={() => {
                onEvidenceClose()
                setTitle("")
                setDate(null)
                setProblem('')
                setRca('')
                setRate(null)
                setId(null)
                setItem('')
                setStatus('')
                setResolution('')
                setTime('')
            }} 
                size="xl"
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Evidence</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <RMIUploader 
                        isOpen={visible}
                        hideModal={hideModal}
                        onSelect={onSelect}
                        onUpload={onUpload}
                        onRemove={onRemove}
                    />

                    <Table>
                        <Tbody>
                            {
                                images.map(e => (
                                    <img src={e.evidence_img} alt="" />
                                ))
                            }
                        </Tbody>
                    </Table>
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

            <Modal onClose={() => {
                setTitle("")
                setDate(null)
                setTime(null)
                setProblem('')
                setRca('')
                setRate(null)
                setId(null)
                setItem('')
                setStatus('')
                setResolution('')
                onDetailClose()
                setImages([])
            }} size={'full'} isOpen={isDetailOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
                    <Text fontSize={'50px'}>{
                        title      
                    }</Text>
                  </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Center>
              <Table width={'100%'} border='2'>
                  <Tr>
                      <Th>Problem Description</Th>
                      <Th>:</Th>
                      <Td>
                          {
                              problem
                          }
                      </Td>
                  </Tr>
                  <Tr>
                      <Th>RCA</Th>
                      <Th>:</Th>
                      <Td>
                          {
                              rca
                          }
                      </Td>
                  </Tr>
                  <Tr>
                      <Th>Problem Resolution</Th>
                      <Th>:</Th>
                      <Td>
                        <div dangerouslySetInnerHTML={{ __html: resolution  }} />
                      </Td>
                  </Tr>
                  <Tr>
                      <Th>Action Item </Th>
                      <Th>:</Th>
                      <Td>
                        <div dangerouslySetInnerHTML={{ __html: item  }} />
                      </Td>
                  </Tr>
                  <Tr>
                      <Th>Date </Th>
                      <Th>:</Th>
                      <Td>
                      <Moment format='MMMM Do YYYY'>{
                                    date
                        }</Moment>
                      </Td>
                  </Tr>
                  <Tr>
                      <Th>Time </Th>
                      <Th>:</Th>
                      <Td>
                      {
                        time
                      }
                      </Td>
                  </Tr>
                  <Tr>
                      <Th>Success Rate </Th>
                      <Th>:</Th>
                      <Td>
                        {
                            rate
                        }
                      </Td>
                  </Tr>
                  <Tr>
                      <Th>Status </Th>
                      <Th>:</Th>
                      <Td>
                        <Badge colorScheme={status === 'solved' ? 'green' : 'yellow'}>
                            {
                                status
                            }
                        </Badge>
                      </Td>
                  </Tr>
              </Table>
              </Center>
                  <Grid m={6} gap={6} templateColumns='repeat(2, 1fr)'>
                  {
                          images.map(e => (
                            <img src={e.evidence_img} width="1300" alt="" />
                        ))
                      }
                  </Grid>
          </ModalBody>  
          <ModalFooter>
            <Button onClick={onDetailClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </div>
    )
}