import './App.css';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);

  useEffect(()=>{
    client.get('/api/auth/user')
    .then(res=>{
      setCurrentUser(true);
    })
    .catch(err=>{
      setCurrentUser(false);
    });
  },[]);

  useEffect(()=>{
    fetchData();
  }, []);

  function fetchData(){
    client.get('/api/dashboard')
    .then(res=>{
      setData(res.data);
    })
    .catch(err=>{});
  }

  function updateFormBtn(){
    if(registrationToggle){
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    }else{
      document.getElementById("form_btn").innerHTML = "Log In";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e){
    e.preventDefault();
    client.post("/api/auth/register",{email:email, username:username, password:password})
    .then(res=>{
      console.log(res);
      client.post("/api/auth/login",{email:email, password:password})
      .then(res=>{
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e){
    e.preventDefault();
    client.post("/api/auth/login",{email:email, password:password})
    .then(res=>{
      setCurrentUser(true);
    });
  }

  function submitLogout(e){
    e.preventDefault();
    client.post("/api/auth/logout",{withCredentials:true})
    .then(res=>{
      setCurrentUser(false);
    });
  }

  function createPost(e){
    e.preventDefault();
    const title = prompt('Enter Title');
    const description = prompt('Enter Description');
    const likes = prompt('Enter Likes');
    const shares = prompt('Enter Shares');
    const comments = prompt('Enter Comments');
    client.post('/api/dashboard',{title:title, description:description, likes:likes, shares:shares, comments:comments})
    .then(res=>{
      fetchData();
    })
    .catch(err=>{    })
  }

  return(
    <div>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Social Media Dashboard</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              <form onSubmit={e=>createPost(e)}>
                <Button type='submit' variant='light'>Add New Post</Button>
              </form>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='center'>
        <div className='flex-column'>
          {data.map((output,id)=>(
            <div key={id} className='shadow p-3 mb-5 bg-white rounded'>
              <div>
                <h4><span className='text-color'>Title :</span> {output.title}</h4>
                <h4><span className='text-color'>Description :</span> {output.description}</h4>
                <h4><span className='text-color'>Likes :</span> {output.likes}</h4>
                <h4><span className='text-color'>Shares :</span> {output.shares}</h4>
                <h4><span className='text-color'>Comments :</span> {output.comments}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // if(currentUser){
  //   return(
  //     <div>
  //       <Navbar bg="dark" variant="dark">
  //         <Container>
  //           <Navbar.Brand>Social Media Dashboard</Navbar.Brand>
  //           <Navbar.Toggle/>
  //           <Navbar.Collapse className='justify-content-end'>
  //             <Navbar.Text>
  //               <form onSubmit={e=> submitLogout(e)}>
  //                 <Button type='submit' variant='light'>Log Out</Button>
  //               </form>
  //             </Navbar.Text>
  //           </Navbar.Collapse>
  //         </Container>
  //       </Navbar>
  //       <div className='center'>
  //         {data.map((output,id)=>(
  //           <div key={id}>
  //             <div>
  //               <h2>Title : {output.title}</h2>
  //               <h2>Description : {output.description}</h2>
  //               <h2>Likes : {output.likes}</h2>
  //               <h2>Shares : {output.shares}</h2>
  //               <h2>Comments : {output.comments}</h2>
  //             </div>
  //             <hr></hr>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }
  // return(
  //   <div>
  //     <Navbar bg='dark' variant='dark'>
  //       <Container>
  //         <Navbar.Brand>Social Media Dashboard</Navbar.Brand>
  //         <Navbar.Toggle/>
  //         <Navbar.Collapse className='justify-content-end'>
  //           <Navbar.Text>
  //             <Button id='form_btn' onClick={updateFormBtn} variant='light'>Register</Button>
  //           </Navbar.Text>
  //         </Navbar.Collapse>
  //       </Container>
  //     </Navbar>
  //     {
  //       registrationToggle ? (
  //         <div className='center'>
  //           <Form onSubmit={e=>submitRegistration(e)}>
  //             <Form.Group className='mb-3' controlId='formBasicEmail'>
  //               <Form.Label>Email Address</Form.Label>
  //               <Form.Control type='email' placeholder='Enter Email' value={email} onChange={e=>setEmail(e.target.value)}></Form.Control>
  //               <Form.Text className='text-muted'>
  //                 We'll never share your email
  //               </Form.Text>
  //             </Form.Group>
  //             <Form.Group className='mb-3' controlId='formBasicUsername'>
  //               <Form.Label>Username</Form.Label>
  //               <Form.Control type='text' placeholder='Enter Username' value={username} onChange={e=>setUsername(e.target.value)}></Form.Control>
  //             </Form.Group>
  //             <Form.Group className='mb-3' controlId='formBasicPassword'>
  //               <Form.Label>Password</Form.Label>
  //               <Form.Control type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)}></Form.Control>
  //             </Form.Group>
  //             <Button variant='primary' type='submit'>Submit</Button>
  //           </Form>
  //         </div>
  //       ) : (
  //         <div className='center'>
  //           <Form onSubmit={e=>submitLogin(e)}>
  //             <Form.Group className='mb-3' controlId='formBasicEmail'>
  //               <Form.Label>Email</Form.Label>
  //               <Form.Control type='email' placeholder='Enter Email' value={email} onChange={e=>setEmail(e.target.value)}></Form.Control>
  //               <Form.Text className='text-muted'>
  //                 We'll never share your email
  //               </Form.Text>
  //             </Form.Group>
  //             <Form.Group className='mb-3' controlId='formBasicPassword'>
  //               <Form.Label>Password</Form.Label>
  //               <Form.Control type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)}></Form.Control>
  //             </Form.Group>
  //             <Button variant='primary' type='submit'>Submit</Button>
  //           </Form>
  //         </div>
  //       )
  //     }
  //   </div>
  // )
}

export default App;