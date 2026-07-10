import {useContext, useState} from 'react'
import  styles  from './index.module.scss'
import {useNavigate, Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { loginUser } from '../../services/auth.service';


function Loginpage() {
  
  const { login } = useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  return (
    <>
   <div className={styles.Loginpage}>
      <form className={styles.form} onSubmit = {async (e)=>{
        e.preventDefault();
        try {
          const res = await loginUser({email,password,});
          
          console.log(res.data);

          login(res.data.token);

          navigate("/");
        } catch (error) {
            setError(error.response.data.message);
        }
      }

      }>
        <h2>Login your account</h2>
        
        <div className={styles.inputGroup}>
          <input onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="Enter your email" required/>
        </div>
        <div className={styles.inputGroup}>
          <input onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder="Enter your password" required/>
        </div>
        <button type="submit" className={styles.loginBtn}>Login</button>
        <p style={error.length ? { color: 'red'} : { display: 'none'}}>{error}</p>
        <p className={styles.registerText}> Don't have an account?<Link to="/register">Register</Link></p>
      </form>
   </div>
    </>
  )
}

export default Loginpage