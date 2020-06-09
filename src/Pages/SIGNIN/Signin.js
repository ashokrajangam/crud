import React, {Fragment} from 'react'
import Header from '../../Components/HEADER/Header'
import Footer from '../../Components/FOOTER/Footer'
import SigninForm from '../../Components/SIGNIN/Signin_form'
import {Redirect} from 'react-router-dom'
import ApiServices from '../../Services/ApiServices'
import Authservices from '../../Services/AuthServices'

class Signin extends React.Component {
    constructor(props){ 
        super(props);
        this.state = {
            error_msg:'',
            email:'',
            password:'',
            redirectToSignup:false,
            redirectToList:false,
            submit:false,
            flag:'signin'
        }

        this.service = new ApiServices();
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

    handleLogin = (e) => {
        e.preventDefault();
        if(this.validateForm()){
            this.service.isUserRegistered(this.state).then(response=>{
                if(response===1){
                    Authservices.authenticate();
                    this.redirectToList();
                }
            });                               
        }else{
            console.log("no submit");
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

    redirectToSignup = () => {
        this.setState({
            redirectToSignup:true,
            redirectToList:false
        });
    }

    redirectToList = () => {
        this.setState({
            redirectToList:true,
            redirectToSignup:false
        });
    }

    render(){
        return(
            <Fragment>
                <Header page='signin' />
                <SigninForm error_msg={this.state.error_msg}
                            handleLogin={this.handleLogin}
                            email={this.state.email}
                            password={this.state.password}
                            handleInputChange={this.handleInputChange}
                            validateEmail={this.validateEmail}
                            redirectToSignup={this.redirectToSignup}/>
                        {this.state.redirectToSignup?<Redirect to='/signup' />:null}
                        {this.state.redirectToList?<Redirect to='/list' />:null}
                <Footer />
            </Fragment>
        )
    }
}

export default Signin;