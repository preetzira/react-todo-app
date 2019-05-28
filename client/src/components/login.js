import React, {useEffect,useState} from 'react';
import { Redirect } from 'react-router-dom';
import '../assets/floating.labels.css';
import {decryptString, encryptString} from '../encryption-module/encryption';

const Login = () => {

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setAuthentication] = useState(false);

  useEffect(()=>{
      if(localStorage.accessToken){
        setAuthentication(true);
      }
      window.addEventListener('load', formValidation(), false);
    },
    [isAuthenticated]
  )

  function formValidation(){
    localStorage.testUsers = encryptString(JSON.stringify([{"username":"test","password":"test","access_token":"9qny49rhicurvyq94yxrnaciryw9"},{"username":"bob","password":"alice","access_token":"493utrhdgkjhsc985nutsoaexr80"},{"username":"sea","password":"side","access_token":"d9238459cxr90q8sd47w90xxn432"}]))
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    let validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }

  function handleOnChange(event) {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  }

  function handleSubmit(event){
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    const testUsers = JSON.parse(decryptString(localStorage.getItem('testUsers')))
    const validUser = testUsers.filter((user)=>{
      return((user.username === username) && (user.password === password))
    })
    if(validUser.length){
      setAuthentication(true);
      localStorage.setItem('accessToken',validUser[0].access_token);
    } else alert('use test-credentials to authenticate')
  }
  if(isAuthenticated){ return <Redirect to="/" />}
   return(
      <div className="row no-gutters">
        <div className="col-lg-4 col-md-5 col-sm-6 col-10 mx-auto mt-5">
          <div className="card px-1 py-5">
            <h3 className="text-secondary text-center mb-2">Log in here</h3>
            <span className="text-center mb-4"><code className="small">use-credentials: <br/>{JSON.stringify({"test":"test","bob":"alice","sea":"side"})}</code></span>
            <form action="javascript:void(0)" onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="col-md-10 col-10 mx-auto">
                <div className="form-label-group">
                  <input value={userName} onChange={handleOnChange} type="text" id="username" name="username" className="form-control form-control-custom" placeholder="Enter your username here" aria-describedby="inputGroupPrepend" required/>
                  <label htmlFor="username">Enter your username here</label>
                  <div className="invalid-feedback">
                    Please enter a the required field.
                  </div>
                </div>
              </div>
              <div className="col-md-10 col-10 mx-auto">
                <div className="form-label-group">
                  <input value={password} onChange={handleOnChange} type="password" id="password" name="password" className="form-control form-control-custom" placeholder="Enter your password here" aria-describedby="inputGroupPrepend" required/>
                  <label htmlFor="password">Enter your password here</label>
                  <div className="invalid-feedback">
                    Please enter a the required field.
                  </div>
                </div>
              </div>
              <div className="col-md-10 col-10 mx-auto">
                <button type="submit" className="btn btn-outline-primary btn-lg form-control-custom">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Login;
