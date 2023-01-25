import React, { useEffect } from 'react'

import './sidebar.css'
import Logo from '../../assets/images/logo.png'
import { Link, useLocation } from 'react-router-dom'

import sidebar_items from '../../assets/JsonData/sidebar_routes.json'
import { useRecoilState } from 'recoil'
import { authenticated } from '../../store/authStore'


const SidebarItem = props => {
    const active = props.active ? 'active' : ''

    return(
        <div className='sidebar__item'>
            <div className={`sidebar__item-inner ${active} ${props.hidden === 'ya' ? 'hidden' : ''}`}>
                <i className={props.icon}></i>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}

const Sidebar = props => {
    const [auth, setAuth] = useRecoilState(authenticated)

    // const activeItem = sidebar_items.findIndex(item => item.route === props.location.pathname)
    // const activeItem = sidebar_items.findIndex(item => item.route === props.location.pathname)
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    // const splitLocation = pathname.split("/");


    return (
        <div className='sidebar'>
            <div className='sidebar__logo'>
                <img src={Logo} alt="example" />
            </div>
            {
                sidebar_items.map((item, index) => (
                    <Link to={item.route} key={index}>
                        <SidebarItem
                            title={item.display_name}
                            icon={item.icon}
                            active={pathname === item.route ? "active" : ""}
                            hidden={item.cpi}
                        />
                    </Link>
                ))
            }
            {
                auth.auth === true ? (
                    auth.data.role === 'internal' ? (
                    <>
                        <Link to={"/users"}>
                            <SidebarItem
                                title={'User Management'}
                                icon={'bx bx-user-circle'}
                                active={pathname === "/users" ? "active" : ""}
                            />
                        </Link>

                        <Link to={"/lngrng"}>
                            <SidebarItem
                                title={'Long Running Script'}
                                icon={'bx bx-user-circle'}
                                active={pathname === "/lngrng" ? "active" : ""}
                            />
                        </Link>

                        <Link to={"/listnewapp"}>
                            <SidebarItem
                                title={'List New App'}
                                icon={'bx bx-user-circle'}
                                active={pathname === "/listnewapp" ? "active" : ""}
                            />
                        </Link>

                        {/* <Link to={"/rolemonica"}>
                            <SidebarItem
                                title={'Role Monica'}
                                icon={'bx bx-user-circle'}
                                active={pathname === "/rolemonica" ? "active" : ""}
                            />
                        </Link> */}

                        <Link to={"/report-user"}>
                            <SidebarItem
                                title={'Report User'}
                                icon={'bx bx-user-circle'}
                                active={pathname === "/report-user" ? "active" : ""}
                            />
                        </Link>
                        <Link to={"/report-feature"}>
                            <SidebarItem
                                title={'Report Feature'}
                                icon={'bx bx-user-circle'}
                                active={pathname === "/report-feature" ? "active" : ""}
                            />
                        </Link>
                        <Link to={"/tablestatus"}>
                            <SidebarItem
                                title={'Table Status'}
                                icon={'bx bx-user-circle'}
                                active={pathname === "/tablestatus" ? "active" : ""}
                            />
                        </Link>
                        <Link to={"/act_tonight"}>
                            <SidebarItem
                                title={'Activity Tonight'}
                                icon={'bx bx-user-circle'}
                                active={pathname === "/act_tonight" ? "active" : ""}
                            />
                        </Link>

                        <Link to={"/pendingan"}>
                            <SidebarItem
                                title={'Pendingan'}
                                icon={'bx bx-user-circle'}
                                active={pathname === "/pendingan" ? "active" : ""}
                            />
                        </Link>
                    </>
                    ) : ''
                ) : ''
            }
        </div>
    )
}

export default Sidebar
