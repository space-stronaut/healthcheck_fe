import React from 'react'

import './topnav.css'
import Dropdown from '../dropdown/Dropdown'

import { Link } from 'react-router-dom'

import notification from '../../assets/JsonData/notification.json'

import user_image from '../../assets/images/example_profile.png'

import user_menu from '../../assets/JsonData/user_menus.json'

const curr_user = {
    display_name: 'Admin',
    image: user_image
}

const renderNotificationItem = (item, index) => (
    <div className='notification-item' key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
)

const renderUserMenu =(item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

import { useRecoilState } from 'recoil'
import { authenticated } from '../../store/authStore'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    useToast,
    Text
} from '@chakra-ui/react'
import {
    ChevronDownIcon
} from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'

const Topnav = () => {
    const [auth, setAuth] = useRecoilState(authenticated)
    const history = useHistory()
    const toast = useToast()

    const logout = async() => {
        try {
            await localStorage.clear('token')
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const myProfile = () => {
        history.push('/profile')
    }

    return (
        <div className='topnav'>
            <div className='topnav__search' style={{
                opacity : 0
            }}>
                <input type='text' placeholder='Search...' />
                <i className='bx bx-search'></i>
            </div>
            <div className='topnav__right'>
                <div className='topnav__right-item'>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            {
                                auth.data.uname || auth.data.username
                            }
                    </MenuButton>
                    {/* <MenuList>
                        <MenuItem onClick={myProfile}>My Profile</MenuItem>
                    </MenuList> */}
                    <MenuList>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </MenuList>
                    {/* <MenuList>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </MenuList> */}
                </Menu>
                    
                    {/* <Dropdown 
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    /> */}
                </div>
                <div className='topnav__right-item'>
                    {

                    }
                    {/* <Dropdown
                        icon='bx bx-bell'
                        badge='12'
                        contentData={notification}
                        renderItems={(item, index) => renderNotificationItem(item, index)}
                        renderFooter={() => <Link to='/'>View All</Link>}
                    /> */}
                </div>
                <div className='topnav__right-item'>
                    {
                        
                    }
                    <Dropdown/>
                </div>
            </div>
        </div>
    )
}

export default Topnav