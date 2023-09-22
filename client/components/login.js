import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router';
const google = window.google;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [existingAccount, setExistingAccount] = useState(true);
  const navigate = useNavigate();
  const projectName = 'Project0';

  //login function
  async function log(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:3000/route/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
      return navigate('/');
    } else {
      alert('wrong credentials');
    }
  }

  // Google Sign-in
  const googleSuccess = async (res) => {
    const userObject = jwtDecode(res.credential);
    console.log(userObject);
    // added await
    const response = await fetch('http://localhost:3000/route/google', {
      method: 'POST',
      body: JSON.stringify({
        firstName: userObject.given_name,
        username: userObject.email,
        password: userObject.name,
        projectName: projectName

      }),
      headers: { 'Content-type': 'application/json' },
    });
    // if response is valid -> navigate 
    if (response.ok){
      navigate('/');
    } else {
      console.error('Failed to load google acc');
    }
  };

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:
        '498818920714-dtkpgnu8hd0eg8o74j2q2tp4e85k15j3.apps.googleusercontent.com',
      callback: googleSuccess,
    });

    google.accounts.id.renderButton(document.getElementById('signinDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);
  // register function
  async function reg(ev) {
    ev.preventDefault();

    const response = await fetch('http://localhost:3000/route/signup', {
      method: 'POST',
      body: JSON.stringify({ firstName, username, password, projectName }),
      headers: { 'Content-type': 'application/json' },
    });
    if (response.status !== 200) {
      alert('Registration failed.');
    } else {
      alert('Registration Successful');
      return navigate('/');
    }
  }

  const switchToSignUp = () => {
    setExistingAccount(false);
  };
  const switchToLogin = () => {
    setExistingAccount(true);
  };

  return (
    <div className="logPage">
    <div>
      {/* <h2 className="appTitle">Scrum Board</h2> */}
      <h1 className="appTitle" style={{ textAlign: 'center' }}>Scrum Bums! </h1>
      <div  className = "smallTitle" style={{ textAlign: 'center', fontSize: "20px"}}><strong>Created By:</strong> <span style={{fontSize: "2px"}}>Them Pink Fair Armadillos</span></div>
      <div  className = "smallTitle"  style={{ textAlign: 'center', marginBottom: '45px', fontSize: "20px"}}><strong>Iterated On By:</strong> Los Danger Noodles</div>    

    </div>
    {existingAccount && (
      <div>
        <h4 className="logTitle">Please Log In:</h4>
        <form className="logForms">
          <div className="inputForm">
            <input
              className="inputBox"
              type="text"
              id="username"
              placeholder="Enter Your Username: "
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div className="inputForm">
            <input
              className="inputBox"
              type="password"
              id="password"
              placeholder="Enter Your Password:"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <div onClick={log} className="btnDiv">
            <button className="logBtn">Sign In</button>
          </div>
          <div className="btnDiv">
            <button onClick={switchToSignUp} className="logBtn">No account? Sign up</button>
          </div>
          <div id="signinDiv"></div>
          <div></div>
        </form>
      </div>
    )}

    {!existingAccount && (
      <div onSubmit={reg}>
        <form className="logForms" action="">
          <h4 className="logTitle">Register Here:</h4>
          <div className="inputForm">
            <input
              className="inputBox"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </div>

          <div className="inputForm">
            <input
              className="inputBox"
              type="text"
              placeholder="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div className="inputForm">
            <input
              className="inputBox"
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="btnDiv">
            <button className="logBtn">Sign-Up</button>

          </div>

          <div className="btnDiv">
            <button onClick={switchToLogin} className="logBtn">
              Already have an account? Log-in
            </button>
          </div>
        </form>
      </div>
    )}
  </div>
  );
}
