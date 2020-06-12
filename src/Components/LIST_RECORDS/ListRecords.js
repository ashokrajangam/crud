import React from 'react'
import './listRecords.css'

class ListRecords extends React.Component{
    constructor(props) {
        super(props);        
    }

    render(){
        return(
            <table className='list_table'>
                <thead>
                    <tr className="list_row">
                        <th className='list_head'>Name</th>
                        <th className='list_head'>Mobile</th>
                        <th className='list_head'>Course</th>
                        <th className='list_head'>Mark</th>
                        <th className='list_head'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.list_data.map((record)=>{
                        return (
                            <tr key={record.id}>
                                <td className='list_data'>{record.name}</td>
                                <td className='list_data'>{record.mobile}</td>
                                <td className='list_data'>{record.course}</td>
                                <td className='list_data'>{record.mark}</td>
                                <td className='list_data'>
                                    <button id="edit_button" value={record.id} onClick={this.props.onclick}>Edit</button>
                                    <button id="delete_button" value={record.id} onClick={this.props.onDelete}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

export default ListRecords;