import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  let history = useNavigate();
  const [credentials, setCredentials] = useState({ name:'',email: '', password: '' })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name:credentials.name,email: credentials.email, password: credentials.password })
    });
    let json = await response.json();
   
      let { authToken } = json
      localStorage.setItem('token', authToken)
      history('/home')
    
  }
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="container p-5 m-5 ">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 col-6">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name='name' value={credentials.name} id="name" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp