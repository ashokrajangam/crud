import React from 'react'
import '../MAIN/main.css';

const Signup_form = (props) => {
    return(
        <div id="myForm" className='form-container'>
            <div id="error">
                <span id="error_msg">{props.error_msg}</span>
            </div>
            <form onSubmit={props.handleSubmit}>
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
                <input type='submit' value='Signup' />
                <button onClick={props.redirectToSignin}>Already a user? Signin Here!</button>
                {/* <Link to='/'>Already a user? Login here</Link> */}
            </form>                                             
        </div>
    )
}

export default Signup_form;
