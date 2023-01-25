import React, {useEffect, useState} from 'react'

import Sidebar from '../sidebar/Sidebar'
import Topnav from '../topnav/TopNav'
import Routes from '../Routes'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import './layout.css'

import { BrowserRouter, Route } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import {authenticated} from '../../store/authStore'
import { Spinner, Center, Flex } from '@chakra-ui/react'
import {useToast} from '@chakra-ui/react'

const Layout = () => {
    const [auth,setAuth] = useRecoilState(authenticated)
    const [loading, setLoading] = useState(false)
    const check = auth.auth
    const navigate = useHistory()
    const toast = useToast()

    const getData = async() => {
        setLoading(true)
        try {
          const response = await axios.get('/user/me', {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem('token')
            }
            })
        
            // navigate.push('/')
        setAuth({
            auth : true,
            data : response.data.decoded
        })

        setLoading(false)

        console.log(response.data.decoded.uname)
        
        } catch (error) {
            setAuth({
                auth : false
            })
            setLoading(false)
            
            
        }
      }
    
      useEffect(() => {
        getData()
      }, [])

    return loading == false ?  check === true ? 
    (
        <BrowserRouter>
            <Route render={(props) => (
                <div className='layout'>
                    <Sidebar/>
                    <div className="layout__content">
                        <Topnav/>
                        <div className="layout__content-main">
                            <Routes />
                        </div>
                    </div>
                </div>
            )}/>
        </BrowserRouter>
    ) : (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    ) : <Flex justify={'center'} align={'center'}>
            <Spinner size='xl' color="blue.500" marginTop={'40vh'}/>
        </Flex>
    }

export default Layout