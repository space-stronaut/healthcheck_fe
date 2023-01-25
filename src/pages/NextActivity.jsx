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
import { useRecoilState } from 'recoil';
import { authenticated } from '../store/authStore';


export default function NextActivity(){
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
    const [activity, setActivity] = useState('')
    const [date, setDate] = useState(null)
    const [eta, setEta] = useState('')
    const [images, setImages] = useState([])
    const [status, setStatus] = useState('')
    const [notes, setNotes] = useState('')
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
            const datas = await axios.get('/nextactivity')

            console.log(datas)
            setData(datas.data.nextActivity)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }



    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await axios.post('/nextactivity', {
                date,
                activity_name : activity,
                eta,
                status,
                notes,
                action_item : item
            })

            // console.log(resolution)

            toast({
                title: 'Record created.',
                position : 'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })
              setDate(null)
              setActivity('')
              setEta('')
              setStatus('')
              setNotes('')
              setItem('')
              setId(null)

            onFormClose()

            getData()
        } catch (error) {
            alert('error')
        }
    }

    const handleDelete = async(e) => {
        try{
            await axios.delete('/nextactivity/delete/' + e)

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
              setActivity(e.activity_name)
              setEta(e.eta)
              setStatus(e.status)
              setNotes(e.notes)
              setItem(e.action_item)
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
            await axios.put('/nextactivity/update/' + id, {
                date,
                activity_name : activity,
                eta,
                status,
                notes,
                action_item : item
            })

            // console.log(resolution)

            toast({
                title: 'Record updated.',
                position : 'top-right',
                status: 'success',
                duration: 2000,
                isClosable: true,
              })

              setDate(null)
              setActivity('')
              setEta('')
              setStatus('')
              setNotes('')
              setItem('')
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

    const [auth, setAuth] = useRecoilState(authenticated)

    return (
        <div className="content">
            {
                auth.auth === true ? (
                    auth.data.role === 'internal' ? (
                        <Button onClick={onFormOpen} marginBottom={'10'} colorScheme={'red'}>Create Record</Button>
                    ) : ''
                ) : ''
            }
            <Box borderWidth='1px' borderRadius='lg' overflow='hidden' overflowY="auto" maxHeight="650px">
            
            <Box>
            
            </Box>
            <Table variant='simple' size={'lg'} width="100%" style={{
                'width' : '100%'
            }} colorScheme={'facebook'}>
            <Thead position="sticky" top={0} bgColor="white" zIndex={3}>
                <Tr>
                <Th>#</Th>
                <Th>Request Date</Th>
                <Th>Activity Name</Th>
                <Th>Action Item</Th>
                <Th>ETA</Th>
                <Th>Status</Th>
                <Th>
                    Notes
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
                            data?.map((e, index) => (
                                <Tr key={e.id}>
                                <Td>
                                    {
                                        index + 1
                                    }
                                </Td>
                                <Td><Moment format='MMMM Do YYYY'>{
                                    e.date
                                }</Moment></Td>
                                <Td>{
                                    e.activity_name
                                }</Td>
                                <Td>
                                    <div dangerouslySetInnerHTML={{ __html: e.action_item }} />
                                </Td>
                                <Td>{
                                    e.eta    
                                }</Td>
                                <Td><Badge colorScheme={e.status === 'Completed' ? 'green' : 'red'}>
                                {
                                    e.status    
                                }
                                </Badge>
                                </Td>
                                <Td>{
                                    e.notes    
                                }</Td>
                                
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
            </Box>

            <Modal isOpen={isFormOpen} onClose={() => {
                onFormClose()
                setDate(null)
              setActivity('')
              setEta('')
              setStatus('')
              setNotes('')
              setItem('')
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
                            <FormLabel htmlFor='email'>Activity Name</FormLabel>
                            <Input id='email' type='text' value={activity} onChange={(e) => setActivity(e.target.value)} isRequired/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Date</FormLabel>
                            <Input id='email' type='date' value={date} onChange={(e) => setDate(e.target.value)} isRequired/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>ETA</FormLabel>
                            <Input id='email' type='text' value={eta} onChange={(e) => setEta(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Status</FormLabel>
                            <Input id='email' type='text' value={status} onChange={(e) => setStatus(e.target.value)} isRequired/>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='email'>Notes</FormLabel>
                            <Input id='email' type='text' value={notes} onChange={(e) => setNotes(e.target.value)} isRequired/>
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
                setResolution('')
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
        </div>
    )
}