import React from 'react'
import {Fragment} from 'react'
import axios from 'axios'
import ListRecords from '../List_Records/ListRecords'

class AddRecord extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            course_data:[]
        }
    }
    componentDidMount(){
        this._isMounted = true;
        const API_PATH = 'http://localhost/crud_api/index.php';
        axios({
                method:'post',
                url:`${API_PATH}`,                   
                data: this.state
        }).then(res=>{   
                if (this._isMounted) {
                    this.setState({
                       course_data:res.data
                    })  
                }
        }).catch((err)=>console.log(err));  
    }
    componentWillUnmount(){
        this._isMounted= false;
    }
    componentDidUpdate(){
        console.log('component updated');
    }
    render(){
        return(
            <form id='add_record_form' onSubmit={this.props.handlesubmit}>        
            <table>
                <tbody>
                <tr><td><span>{this.props.error_msg}</span></td></tr>
                <tr>
                    <td>
                        <input id='name' type='text' value={this.props.name} onChange={this.props.onchange} placeholder='Name' />
                    </td>
                    <td>
                        <input id='mobile' type='text' value={this.props.mobile} onChange={this.props.onchange} 
                            placeholder='Mobile' />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input id='mark' type='text' value={this.props.mark} onChange={this.props.onchange} placeholder='12th Mark' />
                    </td>
                    <td>
                        <select id='course' onChange={this.props.onchange} value={this.props.course_id}>
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
        )
    }    
}

let initial_state = {
    add_new_record:false,
    name:'',
    mobile:'',
    mark:'',
    course:true,
    course_data:[],
    error:'',
    course_id:0,
    data:[],
    flag:'get_list_data',
    edit:false,
    row_id:0,
    edit_record:[]
};

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = initial_state;
    }

    componentDidMount () {
        this._isMounted = true;
        const API_PATH = 'http://localhost/crud_api/admission_api.php';
        axios({
                method:'post',
                url:`${API_PATH}`,                   
                data: this.state
        }).then(res=>{                 
            if (this._isMounted) {
                this.setState({data:res.data});
            }   
        }).catch((err)=>console.log(err)); 
    }

    componentWillUnmount() {
        this._isMounted= false;
    }

    componentDidUpdate(){
        console.log('component did update : list data');
        if(this.state.flag==="get_list_data"){
            const API_PATH = 'http://localhost/crud_api/admission_api.php';
            axios({
                    method:'post',
                    url:`${API_PATH}`,                   
                    data: this.state
            }).then(res=>{
                this.setState({data:res.data});
            }).catch((err)=>console.log(err));    
        }
    }

    add_new_record = (e) => {
        e.preventDefault();        
        this.setState({
            add_new_record:this.state.add_new_record?false:true,
            flag:'add_new_record' 
        });
        // const API_PATH = 'http://localhost/crud_api/index.php';
        //     axios({
        //             method:'post',
        //             url:`${API_PATH}`,                   
        //             data: this.state
        //     }).then(res=>{   
        //             this.setState({
        //                 course_data:res.data,
        //                 add_new_record:this.state.add_new_record?false:true,
        //                 flag:'add_new_record'
        //             })  
        //     }).catch((err)=>console.log(err));    
    }

    validate_fields = () => {
        if((this.state.name==='') || (this.state.mobile==='') || (this.state.mark==='')){
            return false;            
        }else{
            return true;
        }
    }

    edit_record = (e) => {
        const API_PATH = 'http://localhost/crud_api/admission_api.php';
        axios({
                method:'post',
                url:`${API_PATH}`,                   
                data: {edit_id:e.target.value, flag:'get_edit_record'}
        }).then(res=>{             
            let data = {...res.data[0], add_new_record:true};
            this.setState(data);
        }).catch((err)=>console.log(err));          
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.validate_fields()){
            const API_PATH = 'http://localhost/crud_api/admission_api.php';
            axios({
                    method:'post',
                    url:`${API_PATH}`,                   
                    data: this.state
            }).then(res=>{                     
                    if(res.data===1){
                        this.setState(initial_state);
                    }else{
                        this.setState({error:'submission error please check',add_new_record:true});
                    }
            }).catch((err)=>console.log(err)); 
        }else{
            this.setState({error:'All Fields are Required!', show_list:false});
        }
    }

    handleOnChange = (e) => {
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

    render() {
        return(
            <Fragment>
                <div className='list_header'>                               
                    <button onClick={this.add_new_record}>{this.state.add_new_record?'List':'Add'}</button>
                    <button onClick={this.props.onclick}>Logout</button>
                </div>
                <div className='list_content'>
                    {this.state.add_new_record?<AddRecord 
                                                name={this.state.name}
                                                mobile={this.state.mobile}
                                                mark={this.state.mark}
                                                handlesubmit={this.handleSubmit}
                                                onchange={this.handleOnChange}
                                                error_msg={this.state.error}
                                                course_id={this.state.course_id}
                                                // course_data={this.state.course_data}
                                                is_edit={this.state.edit}                                                
                                                />:
                                                <ListRecords
                                                list_data={this.state.data}
                                                onclick={this.edit_record} />}
                    
                </div>                
            </Fragment>
        )
    }
}

export default List;
