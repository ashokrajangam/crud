import React, { Fragment } from 'react'
import ApiServices from '../../Services/ApiServices'
import Header from '../../Components/HEADER/Header'
import Footer from '../../Components/FOOTER/Footer'
import {Redirect} from 'react-router-dom'

class AddRecord extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name:'',
            mobile:'',
            mark:'',
            course_data:[],
            error_msg:'',
            course_id:0,
            submit:false,
            flag:'add_new_record',
            redirectToList:false
        }
        this.service = new ApiServices();
    }
    componentDidMount(){
        this._isMounted = true;
        this.service.loadCourses().then(response=>{
            this.setState({
                course_data:response
            })
        }); 
    }
    componentWillUnmount(){
        this._isMounted= false;
    }
    componentDidUpdate(){
        console.log(this.state);
        console.log('component updated');
    }

    validateForm = () => {
        if((this.state.name==='') || (this.state.mobile==='')){
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
            this.service.addNewRecord(this.state).then(response=>{
                if(response===1){
                    this.redirectToList();
                }
            });                         
        }else{
            console.log("no submit");
        }
    }

    handleInputChange = (e) => {
        let id=e.target.id;
        let update = {};
        if(id==='name'){
            update={name:e.target.value}
        }else if(id==='mobile'){
            update={mobile:e.target.value}
        }else if(id==='mark'){
            update={mark:e.target.value}
        }else if(id==='course'){
            update={course_id:e.target.value}
        }
        this.setState(update);
    }

    redirectToList = () => {
        this.setState({
            redirectToList:true
        });
    }

    render(){
        return(
            <Fragment>
            <Header page='list' />
            {this.state.redirectToList?<Redirect to='/list' />:
            <form id='add_record_form' onSubmit={this.handleSubmit}>        
            <table>
                <tbody>
                <tr><td><span>{this.state.error_msg}</span></td></tr>
                <tr>
                    <td>
                        <input id='name' type='text' value={this.state.name} onChange={this.handleInputChange} placeholder='Name' />
                    </td>
                    <td>
                        <input id='mobile' type='text' value={this.state.mobile} onChange={this.handleInputChange} 
                            placeholder='Mobile' />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input id='mark' type='text' value={this.state.mark} onChange={this.handleInputChange} placeholder='12th Mark' />
                    </td>
                    <td>
                        <select id='course' onChange={this.handleInputChange} value={this.state.course_id}>
                            <option value='0'>Select Course</option>
                            {this.state.course_data.map((data)=>{
                                return <option key={data.id} value={data.id}>{data.course}</option>
                            })}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type='submit' value='submit' />
                    </td>
                </tr>
                </tbody>
            </table>
            </form>
            }
            <Footer />
            </Fragment>
        )
    }    
}

export default AddRecord;