import React from 'react';
import {Link} from 'react-router-dom'
import './header.css'
import Authservices from '../../Services/AuthServices'

const logout=()=>{
    Authservices.signout();
}

const Header = (props) => {    
    return(
        <div class="header_container">
            {props.page==='list'?
                <div class="link_area">
                    <Link to='/add_record'>Add Record</Link>
                    <Link to='/list'>List</Link>
                    <Link to='/' onClick={logout}>Logout</Link>
                </div>
            :
                <div class="link_area">
                    <Link to='/' exact >Signin</Link>
                    <Link to='/signup' >Signup</Link>
                </div>
            }
        </div>
    )
}

export default Header;