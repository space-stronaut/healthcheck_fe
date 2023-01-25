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
    Select,
    Badge
  } from '@chakra-ui/react'
import { RMIUploader } from 'react-multiple-image-uploader';


export default function Summary(){
    const toast = useToast()
    const { 
        isOpen : isDeleteOpen, 
        onOpen : onDeleteOpen, 
        onClose : onDeleteClose 
    } = useDisclosure()
    const cancelRef = React.useRef()
    const [data, setData] = useState([])
    const [date, setDate] = useState('')
    const [status, setStatus] = useState(null)
    const [category, setCategory] = useState('')
    const categories = [
        'Summary DB',
        'Summary Storage IOPS',
        'Storage Environment',
        'TC Dashboard',
        'Monica',
        'CPU FR',
        'CPU RB',
        'CPU RPL',
        'CPU Marcela',
    ]
    const { 
        isOpen : isFormOpen, 
        onOpen : onFormOpen,  
        onClose : onFormClose
    } = useDisclosure()
    const [id, setId] = useState(null)
    const [loading, setLoading] = useState(false)

    const getData = async() => {
        setLoading(true)
        try{
            const datas = await axios.get('/summary')

            console.log(datas)
            setData(datas.data.summary)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }



    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await axios.post('/summary', {
                date,
                status,
                category
            })

            // console.log(resolution)

            toast({
                title: 'Record created.',
                position : 'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
              setDate('')
              setStatus(null)
              setCategory('')

            onFormClose()

            getData()
        } catch (error) {
            alert('error')
        }
    }

    const handleDelete = async(e) => {
        try{
            await axios.delete('/summary/delete/' + e)

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
            setDate(e.date)
              setStatus(e.status)
              setCategory(e.category)
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
            await axios.put('/summary/update/' + id, {
                date,
                status,
                category
            })


            toast({
                title: 'Record updated.',
                position : 'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })

              setDate('')
              setStatus(null)
              setCategory('')
              setId(null)
              getData()
            onFormClose()
        } catch (error) {
            
        }
    }


    useEffect(() => {
        getData()
    }, []);

    return (
        <div className="content">
            <Box p={4} borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Box>
            <Button onClick={onFormOpen} colorScheme={'blue'}>Create Record</Button>
            </Box>
            <Table variant='simple' size={'lg'} width="100%" style={{
                'width' : '100%'
            }} colorScheme={'facebook'}>
            <Thead>
                <Tr>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>
                    Category
                </Th>
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
                            data?.map(e => (
                                <Tr key={e.id}>
                                <Td><Moment format='MMMM Do YYYY'>{
                                    e.date
                                }</Moment></Td>
                                <Td>
                                    <Badge colorScheme={e.status === 'normal' ? 'green' : 'red'}>{
                                    e.status    
                                }</Badge></Td>
                                <Td>
                                    {
                                        e.category
                                    }
                                </Td>
                                <Td>
                                    <HStack spacing={'24px'}>
                                        <Button colorScheme={'green'} onClick={() => handleEdit(e)}>Edit</Button>
                                        <Button colorScheme='red' onClick={() => {
                                            onDeleteOpen()
                                            setId(e.id)
                                        }}>
                                            Delete
                                        </Button>
                                    </HStack>
                                </Td>
                                </Tr>
                            ))
                        )
                    }
            </Tbody>
            </Table>
            </Box>

            <Modal isOpen={isFormOpen} onClose={() => {
                onFormClose()
                setDate('')
              setStatus(null)
              setCategory('')
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
                            <FormLabel htmlFor='user'>Date</FormLabel>
                            <Input id='text' type='date' value={date} onChange={(e) => setDate(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='number'>Status</FormLabel>
                            <Select placeholder="Choose Status" onChange={e => setStatus(e.target.value)}>
                                <option value="normal" selected={status === 'normal'}>Normal</option>
                                <option value="anomaly" selected={status === 'anomaly'}>Anomaly</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='number'>Kategori</FormLabel>
                            <Select placeholder="Choose Category" onChange={e => setCategory(e.target.value)}>
                                {
                                    categories.map(e => (
                                        <option value={e} selected={category === e}>{e}</option>
                                    ))
                                }
                            </Select>
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
                    setDate('')
              setStatus(null)
              setCategory('')
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