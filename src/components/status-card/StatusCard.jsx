import { Badge } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

import './statuscard.css'

const StatusCard = props => {
    return (
        <Link to={props.link}>
            <div className='status-card'>
                <div className="status-card__icon">
                    <i className={props.icon}></i>
                </div>
                <div className="status-card__info">
                    <h4><Badge colorScheme={props.count === 'normal' ? 'green' : 'red'}>{props.count}</Badge></h4>
                    <Link to={props.link}><b>{props.title}</b></Link>
                    <p>Last Update : {props.update}</p>
                </div>
            </div>
        </Link>
    )
}

export default StatusCard