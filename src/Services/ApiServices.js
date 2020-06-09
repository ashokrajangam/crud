import axios from 'axios'

const API_PATH = 'http://localhost/crud_api/index.php';

class ApiServices {

    createNewUser(data1){
        return axios({
                method:'post',
                url:`${API_PATH}`,                   
                data: data1
        }).then(res=>res.data);        
    }

    isUserRegistered(data1){
        return axios({
                method:'post',
                url:`${API_PATH}`,                   
                data: data1
        }).then(res=>res.data);        
    }

    getListData(data1){
        return axios({
            method:'post',
            url:`${API_PATH}`,                   
            data: data1
        }).then(res=>res.data);  
    }
    
    loadCourses(){
        return axios({
            method:'post',        
            url:`${API_PATH}`,
            data:{flag:'load_courses'}                   
        }).then(res=>res.data);  
    }

    addNewRecord(data1){
        return axios({
            method:'post',
            url:`${API_PATH}`,                   
            data: data1
        }).then(res=>res.data);  
    }

    loadEditData(data1){
        return axios({
            method:'post',
            url:`${API_PATH}`,                   
            data: {edit_id:data1,flag:'fetch_edit_data'}
        }).then(res=>res);  
    }

    updateRecord(data1){
        return axios({
            method:'post',
            url:`${API_PATH}`,                   
            data: data1
        }).then(res=>res.data);  
    }

    deleteRecord(id){
        return axios({
            method:'post',
            url:`${API_PATH}`,                   
            data: {id:id, flag:'delete_record'}
        }).then(res=>res.data); 
    }
}

export default ApiServices;