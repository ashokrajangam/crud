import React, { Fragment } from 'react';
import Header from '../../Components/HEADER/Header'
import Footer from '../../Components/FOOTER/Footer'
import SignupForm from '../../Components/SIGNUP/Signup_form'
import {Redirect} from 'react-router-dom'
import ApiServices from '../../Services/ApiServices'


class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error_msg:'',
            email:'',
            password:'',
            redirectToSignin:false,
            submit:false,
            flag:'signup'
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

    handleSubmit = (e) => {
        e.preventDefault();
        
        if(this.validateForm()){
            this.service.createNewUser(this.state).then(response=>{
                if(response===1){
                    this.redirectToSignin();
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

    redirectToSignin = () => {
        this.setState({
            redirectToSignin:true
        });
    }

    render(){
        return(
            <Fragment>
                <Header page='signup' />
                    <SignupForm error_msg={this.state.error_msg}
                                handleSubmit={this.handleSubmit}
                                email={this.state.email}
                                password={this.state.password}
                                handleInputChange={this.handleInputChange}
                                validateEmail={this.validateEmail}
                                redirectToSignin={this.redirectToSignin} />
                    {this.state.redirectToSignin?<Redirect to='/' />:null}
                <Footer />
            </Fragment>
        )
    }
}

export default Signup;
