import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Spinner
} from '@chakra-ui/react';
import './utilities.css'
import Tsel from '../assets/images/Telkomsel_2021_icon.svg.png'
import Headway from '../assets/images/photo-1486312338219-ce68d2c6f44d.webp'
import './login.css'
// import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css'
import React,{useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { authenticated } from '../store/authStore'
import { useToast } from '@chakra-ui/react'
import Logo from '../assets/images/logo.png'
import { PhoneIcon } from '@chakra-ui/icons'
import { right } from '@popperjs/core'

export default function Login(){
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [auth,setAuth] = useRecoilState(authenticated)
  const [loading, setLoading] = useState(false)
    const check = auth.auth
  const history = useHistory()
  const toast = useToast()

  const handleLogin = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('/user/login', {
        username,
        password
      })

      localStorage.setItem('token', response.data.accessToken)
      setAuth({
        auth : true,
        data : response.data.user
      })
      setLoading(false)

      // history('/')
      toast({
        title: `Welcome ${response.data.user.username}`,
        position : 'top-right',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
      history.push('/')

    } catch (error) {
      console.log(error)
      setLoading(false)
      toast({
        title: `Credentials doesnt match our record`,
        position : 'top-right',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  return (
    <>
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <img src={Tsel} alt="" width={40} style={{paddingBottom : 20}} />
          <Heading fontSize={'2xl'} style={{paddingBottom : 20}}>Sign in to your account</Heading>
          <form onSubmit={handleLogin}>
          <FormControl id="email" style={{paddingBottom : 20}}>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} onChange={e => setUsername(e.target.value)} focusBorderColor="red.200" placeholder='Type Username Here'/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} focusBorderColor="red.200" placeholder='Type Password Here'/>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              {/* <Checkbox>Remember me</Checkbox>
              <Link color={'blue.500'}>Forgot password?</Link> */}
            </Stack>
            <Button colorScheme={'red'} variant={'solid'} type={'submit'}>
            {
              loading === true ? (
                <Spinner />
              ) : 'Login'
            }
            </Button>
          </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            Headway
          }
        />
      </Flex>
    </Stack>
    </>
  )
}