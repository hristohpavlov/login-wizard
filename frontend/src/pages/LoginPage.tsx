import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages/LoginPage.css';
import backArrow from "../assets/icons/back-arrow.svg"
import bookIcon from "../assets/icons/book-icon.svg";


const LoginPage = () => {

  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [errorMobile, setErrorMobile] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const navigate = useNavigate();
  
  const handleContinue = async() => {
    setErrorMobile('');
    setErrorEmail('');
    if (!mobile) {
      setErrorMobile('Please enter your mobile number');
    }
    if (!email) {
      setErrorEmail('Please enter your email id');
    }
    const formattedNum = `+359${mobile.split("").slice(1).join("")}`
    try {
      if(email && mobile){
        const response = await axios.get('http://localhost:5000/api/validateUserData', {params: 
        { 
          mobile: formattedNum,
          email: email
        }
        });
      
      if(response.status === 200){
        localStorage.setItem('num', mobile);
        localStorage.setItem('email', email);
        navigate('/verify-mobile')
      } else {
        setErrorEmail(response.data.error || 'An error occurred during validation');
      }
      }
    } catch (error:any) {
      setErrorEmail(error.response.data.error || 'An error occurred during validation');
    }
  };

  return (
    <div className="login-container"> 
      <div className="landing-title">Welcome to Website</div>
        <div className="content-wrapper">
          <div className="title-container">
            <button className="back-button" onClick={() => navigate(-1)}><img className="back-icon"src={backArrow} alt="back icon" /></button>
            <div className="login-title">Enter your mobile no. & email id</div>
          </div>
          <div className="main-icon-container"><img className="main-icon"src={bookIcon} alt="main icon" /></div>
          <div className="main-container">
          <div className="field-text">Mobile No.</div>
          <input className={`input-field field-one ${errorMobile && 'error'}`} type="text" placeholder="Enter your mobile no." value={mobile} onChange={(e) => setMobile(e.target.value)} />
          {errorMobile && <div className="error-message">{errorMobile}</div>}
          <div className="field-text">Email Address</div>
          <input className={`input-field field-two ${errorEmail && 'error'}`} type="text" placeholder="Enter your email id" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errorEmail && <div className="error-message">{errorEmail}</div>}
          <div className="continue-button-container">
            <button className="continue-button" onClick={handleContinue}>Continue</button>
          </div>
        </div>
        <div className="tos-text">By signing up, I agree to the <Link to="#">Privacy Policy</Link> & <Link to="#">Terms of Use</Link></div>
        </div>
    </div>
  );
};

export default LoginPage;