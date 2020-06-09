import React from 'react'

class ListRecords extends React.Component{
    constructor(props) {
        super(props);        
    }

    render(){
        return(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Course</th>
                        <th>Mark</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.list_data.map((record)=>{
                        return (
                            <tr key={record.id}>
                                <td>{record.name}</td>
                                <td>{record.mobile}</td>
                                <td>{record.course}</td>
                                <td>{record.mark}</td>
                                <td>
                                    <button value={record.id} onClick={this.props.onclick}>Edit</button>
                                    <button value={record.id} onClick={this.props.onDelete}>Delete</button>
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