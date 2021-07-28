import { object } from 'prop-types';
import React, {Component} from 'react';
import './App.css';

const formValid=({inputErrors, ...rest})=>{
  let valid=true;
  Object.values(inputErrors).forEach(x=>{
    x.length>0 && (valid=false);
  });
  return valid;
}

class App extends Component{

  constructor(props){
    super(props);
    this.state={
      username:null,
      password:null,
      inputErrors:{
        username:"",
        password:""
      }
    };
  }

  handleSubmit=e=>{
    e.preventDefault();

    if(formValid(this.state)){
      console.log("--Submitting--");
    } else{
      console.log("Form invalid.");
    }
  };

  handleChange=e=>{
    e.preventDefault();
    const {name, value}=e.target;
    let inputErrors={...this.state.inputErrors};

    switch(name){
      case "username":
        inputErrors.username=value.length===0?"Username can not be empty.":"";
        break;
      case "password":
        inputErrors.password=value.length<6?"Password should be atleast 6 characters.":"";
        break;
      default:
       break;
    }
   
    this.setState({inputErrors});

  }

  render(){
    const {inputErrors}=this.state;

    return (
      <div className="form-page">
        <div className="form-box">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="username">
              <label htmlFor="username">Username</label>
              <input 
                className={inputErrors.username.length>0?"error":null}
                placeholder="username"
                type="text"
                name="username"
                noValidate
                onChange={this.handleChange}
              />
              {inputErrors.username.length>0&&(
                <span className="errorMessage">{inputErrors.username}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input 
                className={inputErrors.password.length>0?"error":null}
                placeholder="password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {inputErrors.password.length>0&&(
                <span className="errorMessage">{inputErrors.password}</span>
              )}
            </div>
            <div className="submit">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
