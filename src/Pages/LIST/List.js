import React, {Fragment} from 'react'
import ListRecords from '../../Components/LIST_RECORDS/ListRecords'
import ApiServices from '../../Services/ApiServices'
import '../../Components/LIST/List.css'
import Header from '../../Components/HEADER/Header'
import Footer from '../../Components/FOOTER/Footer'
import {Redirect} from 'react-router-dom'


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
    edit_record:[],
    edit_id:0
};

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = initial_state;
        this.service = new ApiServices();
    }

    componentDidMount () {
        this._isMounted = true;
        if(this._isMounted){

        }
        this.service.getListData(this.state).then(response=>{
            this.setState({data:response});
        }); 
    }

    componentWillUnmount() {
        this._isMounted= false;
    }

    componentDidUpdate(){

    }

    edit_record = (e) => {
        this.setState({
            edit:true,
            edit_id:e.target.value
        });
    }

    delete_record = (e) => {
        console.log(e.target.value);
        this.service.deleteRecord(e.target.value).then(response=>{
            console.log(response);
            if(response===1){
                this.forceUpdate();
            }
        }); 
    }

    render() {
        return(
            <Fragment>
                <Header page='list' />
                <div className='list_content'>
                <ListRecords list_data={this.state.data}
                             onclick={this.edit_record}
                             onDelete={this.delete_record} />
                    
                </div>
                {this.state.edit?<Redirect to={{pathname:'/edit_record', state:{edit_id:this.state.edit_id}}} />:null}
                <Footer />                
            </Fragment>
        )
    }
}

export default List;