import {useState} from 'react'
import  styles  from './index.module.scss'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'


function Registerpage() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  return (
    <>
   <div className={styles.Registerpage}>
      <form className={styles.form} onSubmit = { (e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/register', {firstName, lastName, email, password}).then((res)=>{
            console.log(res.data);
            navigate('/login');
        })
        .catch((error)=>{
            setError(error.response.data.message);
        })
      }

      }>
        <h2>Register your account</h2>
        <div className={styles.inputGroup}>
          <input onChange={(e)=>{setFirstName(e.target.value)}} type="text" placeholder="Enter your first name" required/>
        </div>
        <div className={styles.inputGroup}>
          <input onChange={(e)=>{setLastName(e.target.value)}} type="text" placeholder="Enter your last name" required/>
        </div>

        <div className={styles.inputGroup}>
          <input onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="Enter your email" required/>
        </div>
        <div className={styles.inputGroup}>
          <input onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder="Enter your password" required/>
        </div>
        <button type="submit" className={styles.registerBtn}>Register</button>
        <p style={error.length ? { color: 'red'} : { display: 'none'}}>{error}</p>
        <p className={styles.loginText}>Do you have an account? <Link to="/login">Login</Link></p>
      </form>
   </div>
    </>
  )
}

export default Registerpage