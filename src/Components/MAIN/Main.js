import React  from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import List from '../../Pages/LIST/List'
import Signup from '../../Pages/SIGNUP/Signup'
import Signin from '../../Pages/SIGNIN/Signin'
import AddRecord from '../../Pages/ADD_RECORD/AddRecord'
import Authservices from '../../Services/AuthServices'
import EditRecord from '../../Pages/EDIT_RECORD/EditRecord'


const Main = () => {
    return(
        <Switch>
            <Route path='/' exact component={Signin} />
            <Route path='/signup' component={Signup} />                   
            <PrivateRoute path='/list' component={List} />
            <PrivateRoute path='/add_record' component={AddRecord} />
            <PrivateRoute path='/edit_record' component={EditRecord} />
        </Switch>                        
    )
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => 
        Authservices.getAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )
      }
    />
  );

export default Main;
