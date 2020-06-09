import React from 'react'
import '../MAIN/main.css';

const Signin_form = (props) => {
    return(
        <div id="loginForm" className='form-container'>
                <div id="error">
                    <span id="error_msg">{props.error_msg}</span>
                </div>
                <form onSubmit={props.handleLogin}>
                    <label htmlFor='email'>Email</label>
                    <input type='text' id='email' 
                            value={props.email} 
                            onChange={props.handleInputChange}
                            onBlur={props.validateEmail} 
                            />                    
                    <br />
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' 
                            value={props.password} 
                            onChange={props.handleInputChange}
                            /> 
                    <br />                    
                    <input type='submit' value='Login' />
                    <button onClick={props.redirectToSignup}>New user? Signup here!</button>
                </form>                                             
            </div>
    )
}

export default Signin_form;