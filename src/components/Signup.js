import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "",cpassword: "" });
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    let navigate=useNavigate();

    useEffect(() => {
      setIsSubmitEnabled(credentials.password === credentials.cpassword && credentials.password !== "");
  }, [credentials]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name,email,password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authenticationToken);
            navigate("/");
            props.showAlert("Account Created Successfully","success")

        }
        else if(!json.success){
            props.showAlert("Invalid Credentials","danger")
               console.log("invalid");
        }
    }
    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

  return (
    <div className='container mt-3'>
      <form onSubmit={handleSubmit}>
      <div className="mt-3">
      <h3> Create an account to use iNoteBook </h3>
    <label htmlFor="name" className="form-label"> Name </label>
    <input type="text onChange={onChange}" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange}/>
  </div>
  <div className="mt-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mt-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} minLength={5} required id="password"/>
  </div>
  <div className="mt-3">
    <label htmlFor="password" className="form-label"> Confirm Password</label>
    <input type="password" className="form-control" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required id="cpassword"/>
  </div>
  
  <button type="submit" className="btn btn-primary mt-3" disabled={!isSubmitEnabled}>Submit</button>
</form>
    </div>
  )
}

export default Signup
