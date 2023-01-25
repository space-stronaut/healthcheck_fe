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
    TableContainer,
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
import { useRecoilState } from 'recoil';
import { authenticated } from '../store/authStore';


export default function User(){
    const toast = useToast()
    const { 
        isOpen : isDeleteOpen, 
        onOpen : onDeleteOpen, 
        onClose : onDeleteClose 
    } = useDisclosure()
    const cancelRef = React.useRef()
    const [data, setData] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
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
            const datas = await axios.get('/user/users')

            console.log(datas)
            setData(datas.data.users)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }

    const [error , setError] = useState(null)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await axios.post('/user/register', {
                username,
                email,
                password,
                role
            })

            // console.log(resolution)

            toast({
                title: 'User created.',
                position : 'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
              setUsername('')
              setEmail('')
              setPassword('')
              setRole('')
            setId(null)

            onFormClose()

            getData()
        } catch (error) {
            
            // console.log(response.error.name)
            // setError(response.error.errors[0].message)
            // console.log(response)
        }
    }

    const handleDelete = async(e) => {
        try{
            await axios.delete('/user/delete/' + e)

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
            setUsername(e.username)
              setEmail(e.email)
              setRole(e.role)
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
            await axios.put('/user/update/' + id, {
                username,
                email,
                password,
                role
            })


            toast({
                title: 'Record updated.',
                position : 'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })

              setUsername('')
              setEmail('')
              setPassword('')
              setRole('')
            setId(null)
              getData()
            onFormClose()
        } catch (error) {
            
        }
    }

    const [auth, setAuth] = useRecoilState(authenticated)

    useEffect(() => {
        getData()
    }, []);

    return (
        <div className="content">
            {
                error !== null ? 'ada' : ''
            }
            {
                auth.auth === true ? (
                    auth.data.role === 'internal' ? (
                        <Button onClick={onFormOpen} marginBottom={'10'} colorScheme={'red'}>Create User</Button>
                    ) : ''
                ) : ''
            }
            <Box borderWidth='1px' borderRadius='lg' overflow='hidden' overflowY="auto" maxHeight="650px">
            <Box>
            </Box>
            <TableContainer>
            <Table variant='simple' size={'lg'} width="100%" style={{
                'width' : '100%'
            }} colorScheme={'facebook'}>
            <Thead position="sticky" top={0} bgColor="white" zIndex={3}>
                <Tr>
                <Th>Username</Th>
                {
                                    auth.auth === true ? (
                                        auth.data.role === 'internal' ? (
                                            <Th>Email</Th>
                                        ) : ''
                                    ) : ''
                                }
                <Th>
                    Role
                </Th>
                {
                                    auth.auth === true ? (
                                        auth.data.role === 'internal' ? (
                                            <Th>Action</Th>
                                        ) : ''
                                    ) : ''
                                }
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
                            data?.filter(e => e.username !== "internal").map(e => (
                                <Tr key={e.id}>
                                <Td>{
                                    e.username
                                }</Td>
                                {
                                    auth.auth === true ? (
                                        auth.data.role === 'internal' ? (
                                            <Td>
                                                {
                                                    e.email
                                                }
                                            </Td>
                                        ) : ''
                                    ) : ''
                                }
                                <Td>
                                    <Badge colorScheme={e.role === "internal" ? "green" : "yellow"}>{
                                    e.role === "internal" ? "Full Access" : "Read Only"    
                                }</Badge></Td>
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
                                                </HStack>
                                            </Td>
                                        ) : ''
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
                setUsername('')
                setEmail('')
                setPassword('')
                setRole('')
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
                            <FormLabel htmlFor='user'>Username</FormLabel>
                            <Input id='text' type='text' value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="new-password"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='user'>Email</FormLabel>
                            <Input id='text' type='email' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="new-password"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='user'>Password</FormLabel>
                            <Input id='text' type='password' value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password"/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='number'>Role</FormLabel>
                            <Select placeholder="Choose Role" onChange={e => setRole(e.target.value)}>
                                <option value="internal" selected={role === 'internal'}>Full Access</option>
                                <option value="tsel" selected={role === 'tsel'}>Read Only</option>
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


            <AlertDialog
                isOpen={isDeleteOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => {
                    onDeleteClose()
                    setUsername('')
                setEmail('')
                setPassword('')
                setRole('')
              setId(null)
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