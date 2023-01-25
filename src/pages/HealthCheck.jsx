import React, {useEffect, useState} from 'react'
import Moment from 'react-moment'
import axios from 'axios'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
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
    Badge
  } from '@chakra-ui/react'
import { RMIUploader } from 'react-multiple-image-uploader';


export default function HealthCheck(){
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
    const [table, setTable] = useState('')
    const [site, setSite] = useState('')
    const [event, setEvent] = useState(null)
    const [images, setImages] = useState([])
    const [record, setRecord] = useState('')
    const [status, setStatus] = useState('')
    const [item, setItem] = useState('')
    const { 
        isOpen : isFormOpen, 
        onOpen : onFormOpen,  
        onClose : onFormClose
    } = useDisclosure()
    const [id, setId] = useState(null)
    const [loading, setLoading] = useState(false)

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
            const datas = await axios.get('/healthcheck')

            console.log(datas)
            setData(datas.data.datas)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }



    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await axios.post('/healthcheck', {
                table_name : table,
                site,
                event_time : event,
                record,
                status,
            })

            // console.log(resolution)

            toast({
                title: 'Record created.',
                position : 'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
              setTable('')
              setSite('')
              setEvent(null)
              setRecord('')
              setStatus('')

            onFormClose()

            getData()
        } catch (error) {
            alert('error')
        }
    }

    const handleDelete = async(e) => {
        try{
            await axios.delete('/healthcheck/delete/' + e)

            getData()

            console.log(e)

            toast({
                title: 'Record Deleted.',
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
            setTable(e.table_name)
              setSite(e.site)
              setEvent(e.event_time)
              setRecord(e.record)
              setStatus(e.status)
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
            await axios.put('/healthcheck/update/' + id, {
                table_name : table,
                site,
                event_time : event,
                record,
                status,
            })

            // console.log(resolution)

            toast({
                title: 'Record updated.',
                position : 'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })

              setTable('')
              setSite('')
              setEvent(null)
              setRecord('')
              setStatus('')
              setId(null)
              getData()
            onFormClose()
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

    useEffect(() => {
        getData()
    }, []);

    return (
        <div className="content">
            <Box borderWidth='1px' borderRadius='lg' overflow='hidden' overflowY="auto" maxHeight="650px">
            <Table variant='simple' size={'lg'} width="100%" style={{
                'width' : '100%'
            }} colorScheme={'facebook'}>
            <Thead position="sticky" top={0} bgColor="white" zIndex={3}>
                <Tr>
                <Th>Table Name</Th>
                <Th>Site</Th>
                <Th>Event Time</Th>
                <Th>Record</Th>
                <Th>Status</Th>
                {/* <Th>Action</Th> */}
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
                            data?.map(e => (
                                <Tr key={e.id}>
                                <Td>{
                                    e.TABLE_NAME
                                }</Td>
                                <Td>{
                                    e.SITE
                                }</Td>
                                <Td>{
                                    e.event_time === null ? (
                                        ""
                                    ) : (
                                    <Moment format='MMMM Do YYYY, h:mm'>{
                                        e.event_time   
                                    }</Moment>
                                    )
                                }</Td>
                                <Td>{
                                    e.record
                                }</Td>
                                <Td><Badge colorScheme={e.status === 'Green' ? 'green' : 'red'}>{
                                    e.status  === "Green" ? "Updated" : "Not Updated"
                                }</Badge></Td>
                                </Tr>
                            ))
                        )
                    }
            </Tbody>
            </Table>
            </Box>

            <Modal isOpen={isFormOpen} onClose={() => {
                onFormClose()
                setTable('')
              setSite('')
              setEvent(null)
              setRecord('')
              setStatus('')
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
                            <FormLabel htmlFor='email'>Table Name</FormLabel>
                            <Input id='email' type='text' value={table} onChange={(e) => setTable(e.target.value)} isRequired/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Site</FormLabel>
                            <Input id='email' type='text' value={site} onChange={(e) => setSite(e.target.value)} isRequired/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Event Time</FormLabel>
                            <Input id='email' type='datetime-local' value={event} onChange={(e) => setEvent(e.target.value)} isRequired/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Record</FormLabel>
                            <Input id='email' type='number' max={100} value={record} onChange={(e) => setRecord(e.target.value)} isRequired/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Status</FormLabel>
                            <Input id='email' type='text' value={status} onChange={(e) => setStatus(e.target.value)} isRequired/>
                        </FormControl>
                        <Stack spacing={3} marginTop={'10'}>
                            <Button type='submit' colorScheme={'blue'} size={'lg'}>
                                Submit
                            </Button>
                        </Stack>
                    </form>
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