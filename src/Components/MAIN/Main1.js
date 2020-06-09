import React, { Fragment } from 'react';
import './main.css';
import axios from 'axios';
import List from '../List/List'
import '../List/List.css'

const Login = (props) =>{
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
                <button onClick={props.onclick}>New user? Signup here!</button>
            </form>                                             
        </div> 
    )
}

const Signup = (props) => { 
    console.log(props)
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
                <button onClick={props.onclick}>Already a user? Login Here!</button>
                {/* <Link to='/'>Already a user? Login here</Link> */}
            </form>                                             
        </div>           
    )
    
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_registered_user:false,
            email:'',
            password:'',            
            submit:false,
            error_msg:'',
            form:'signup',
            is_authenticated:false
        }
    }

    handleInputChange = (e) => {
        let id = e.target.id;
        let update = {};
        if(id==='email'){
            update = {email:e.target.value};
        }else if(id==='password'){
            update = {password:e.target.value};
        }
        this.setState(update);
    }

    handleLogin = (e) => {
        e.preventDefault();
        console.log(this.state);
        if(this.validateForm()){
            const API_PATH = 'http://localhost/crud_api/index.php';
            axios({
                    method:'post',
                    url:`${API_PATH}`,                   
                    data: this.state
            }).then(res=>{
                if(res.data===1){
                    console.log('dfd');
                    this.setState({
                        is_authenticated:true
                    })  
                }else{
                    this.setState({
                        error_msg:'Invalid user'
                    });
                }
            }).catch((err)=>console.log(err));               
        }else{
            console.log("no submit");
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.validateForm()){
            const API_PATH = 'http://localhost/crud_api/index.php';
            axios({
                    method:'post',
                    url:`${API_PATH}`,                   
                    data: this.state
            }).then(res=>{
                if(res.data===1){
                    this.setState({
                        is_registered_user:true,
                        email:'',
                        password:'',            
                        submit:false,
                        error_msg:'',
                        form:'login',
                        is_authenticated:false
                    })         
                }
            }).catch((err)=>console.log(err));               
        }else{
            console.log("no submit");
        }
    }

    validateForm = () => {
        if((this.state.password==='') || (this.state.email==='')){
            this.setState({submit:false, error_msg:'All the fields are required'});            
            return false;
        }else{
            this.setState({submit:true, error_msg:''});  
            return true;
        }
    }

    validateEmail = (e) => {
        let reg = /\S+@\S+\.\S+/;
        if(e.target.value===''){
            this.setState({submit:false, error_msg:''}); 
            e.target.style='';
            return;
        }
        if(reg.test(e.target.value)){
            this.setState({submit:true, error_msg: ''});
            e.target.style='';
        }else{
            this.setState({submit:false, error_msg:'Invalid email'});
            e.target.style='border:1px solid red';
        }
    }

    alreadyRegistered = (e) => {
        e.preventDefault();
        this.setState({
            is_registered_user:true,
            form:'login'
        });        
    }

    newUser = (e) => {
        e.preventDefault();
        this.setState({
            is_registered_user:false,
            form:'signup'
        });
    }

    logout = (e) => {
        e.preventDefault();
        this.setState({
            is_authenticated:false
        });
    }

    componentDidMount(){
        console.log(this.state);        
    }

    componentDidUpdate(){
        console.log(this.state);
    }
    
    //here we only do switching between login and signup components with its props
    render() {        
        return(
            <Fragment>
                <Switch>
                    <Route path='/' exact render={(props)=><Login {...props} 
                                                                   handleInputChange={this.handleInputChange}
                                                                   handleLogin={this.handleLogin}
                                                                   validateForm={this.validateForm}
                                                                   validateEmail={this.validateEmail}
                                                                   error_msg={this.state.error_msg}
                                                                   onclick={this.newUser} />} />
                    <Route path='/signup' 
                           render={(props)=><Signup {...props}
                                                    handleInputChange={this.handleInputChange}
                                                    handleSubmit={this.handleSubmit}
                                                    validateForm={this.validateForm}
                                                    validateEmail={this.validateEmail}
                                                    error_msg={this.state.error_msg}
                                                    onclick={this.alreadyRegistered}
                                                    />} 
                        />
                    {/* <Route path='/list' component={List} /> */}
                    <Route path='/list' 
                           render={(props)=><List {...props}
                                                    onclick={this.logout} />}/>
                </Switch>                
                {this.state.is_authenticated?<Redirect from='/' to='/list' />:
                    this.state.is_registered_user?<Redirect to='/' />:<Redirect to='/signup' /> 
                }
            </Fragment>
        )
    }
}

export default Main;