import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/components/VerificationCardComponent.css"
import backArrow from "../assets/icons/back-arrow.svg";
import bookIcon from "../assets/icons/book-icon.svg";
import mailIcon from "../assets/icons/mail-icon.svg";
import { getAuth, ConfirmationResult, RecaptchaVerifier, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signInWithPhoneNumber } from 'firebase/auth';
import axios from 'axios';

declare global {
  interface Window {
    recaptchaVerifier:RecaptchaVerifier;
    confirmationResult:ConfirmationResult;
  }
}

interface VerificationComponentProps{
    type?: string;
    navigateToUrl?: string;
    label?: string;
    email?: string;
    number?: string;
    confirmationResult?: ConfirmationResult;
}

const VerificationCardComponent  = (props: VerificationComponentProps) => {
  const [code, setCode] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const recaptchaWrapperRef = useRef<HTMLDivElement>(null!);
  const navigate = useNavigate();
  const auth = getAuth();
  const numParam = localStorage.getItem('num');
  const emailParam = localStorage.getItem('email')
  const number = numParam || props.number
  const email = emailParam || props.email  
  const formattedNum = `+359${number?.split("").slice(1).join("")}`
  
  useEffect(() => {
    setErrorCode('');
    setCode('');
    if(props.type === "email"){
      //reset recaptcha container
      if(recaptchaWrapperRef && recaptchaWrapperRef.current){
        recaptchaWrapperRef.current.innerHTML = '<div id="recaptcha-container"></div>';
      }
      //send code thorugh email auth
      sendOTPemail();
    } else {
      //send code though SMS
      sendOTPsms();
    }
  },[navigate])

  useEffect(() => {
    setIsCodeValid(code.length === 6 && /^\d+$/.test(code));
  },[code])

  const handleContinue = () => {
    setErrorCode('');
    if(!isCodeValid && code){
      if(!(/^\d+$/.test(code))){
        setErrorCode('The code must consist only of numbers');
      }else{
        setErrorCode('The code must consist of 6 numbers');
      }
    }
    if(!code){
      setErrorCode('Please enter a verification code');
    }
    try {
      if (code && isCodeValid) {
        if(props.type === 'mobile'){
          let confirmationResult = window?.confirmationResult;
          confirmationResult.confirm(code)
          .then((result:any) => {
            const user = result.user;
            user.getIdToken()
                .then((idToken:any) => {
                  sendIdTokenToServer(idToken);
                  logLoginAttempt(null, formattedNum, code, 'success')
                  navigate('/verification-success',{
                    state:{
                      idToken: idToken,
                    }
                  });
                })
                .catch((error:any) => {
                  console.error('Error getting ID token:', error);
                  setErrorCode('Error getting ID token');
                });
          }).catch((error: any) => {
            logLoginAttempt(null, formattedNum, code, 'fail')
            setErrorCode(`${error.message}`);
          });
        } else {
            if(email){
              signInWithEmailAndPassword(auth, email, code)
              .then((userCredential) => {
                const user = userCredential.user;
                user.getIdToken()
                .then((idToken) => {
                  sendIdTokenToServer(idToken);
                  logLoginAttempt(email, null, code, 'success')
                  navigate('/verification-success',{
                    state:{
                      idToken: idToken,
                    }
                  });
                })
                .catch((error) => {
                  console.error('Error getting ID token:', error);
                  setErrorCode('Error getting ID token');
                });
              })
              .catch((err) => {
                logLoginAttempt(email, null, code, 'fail')
                setErrorCode(err.message)
              });
            }
          }
        } 
    } catch (error:any) {
      console.error('Error:', error);
      setErrorCode('Invalid code');
    }   
  };

  const handleSwitch = () => {
    navigate(`${props.navigateToUrl}`, {
      state:{
        number: number  || numParam,
        email: email || emailParam
      }
    })
  }

  const sendOTPsms = () => {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': "invisible",
        'callback': (confirmationResult: any) => {
          window.confirmationResult = confirmationResult;
          return;
        },
        'error-callback': (error:any) => {
          console.log("Error: ", error)
        },
        'error-timeout': (error:any) => {
          console.log("Timeout error: ", error)
        }
      });
      let appVerifier= window.recaptchaVerifier;
      signInWithPhoneNumber(auth, formattedNum, appVerifier)
      .then(confirmationResult =>  {
        window.confirmationResult = confirmationResult;
      })
      .catch(
        (error:any) => {
          console.log({error})
          setErrorCode(error.message || 'An error occurred during validation');
        }
      );
  }

  const sendOTPemail = async() => {
    const response = await axios.get('http://localhost:5000/api/generateEmailOTP');
    if(email){
      fetchSignInMethodsForEmail(auth, email)
      .then((result) => {
        if(result.length === 0){
          createUserWithEmailAndPassword(auth, email, response.data.password)
          .then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
              setErrorCode(error.message)
          });
        }else{
            axios.post('http://localhost:5000/api/changeUserPassword', {
              email: email,
              newPassword: response.data.password,
              })
              .then(() => {
                  sendEmail(email, response.data.password);
              })
              .catch((error) => {
                  setErrorCode('Failed to change password');
              });
            }
      });
    }
  }

  const sendEmail = async (email:any, newPassword:any) => {
    try {
      const response = await axios.post('http://localhost:5000/api/sendMail', {
        email: email,
        password: newPassword
      });
    } catch (error:any) {
      setErrorCode('Error sending mail')
    }
  };

  const logLoginAttempt = async (email:any, phone:any, code:any, status:any) => {
    const loginAttemptData = {
      email: email,
      phone: phone,
      code: code,
      status: status,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/api/log', loginAttemptData);
    } catch (error:any) {
      console.error('Error logging login attempt:', error.response.data.error);
    }
  }

  const sendIdTokenToServer = async (idToken:any) => {  
    try {
      const response = await axios.post('http://localhost:5000/api/storeAuthId', {
        idToken: idToken, 
      });
    } catch (error) {
      setErrorCode('Error sending ID token to the server');
    }
  };

  return (
    <div className="verification-container"> 
      <div className="verification-landing-title">{props.type=== "mobile" ? "Verify your mobile number" : "Verify your email address"}</div>
        <div className="landing-content-wrapper">
          <div className="verification-title-container">
            <button className="back-button" onClick={() => navigate(-1)}><img className="back-icon"src={backArrow} alt="back icon" /></button>
            <div className="login-title">A 6-digit code has been sent {props.type === "mobile" ? "as a text message" : ""} to {props.type === "mobile" ? <Link to="#">{number}</Link> : <Link to="#">{email}</Link>}</div>
          </div>
          <div className="main-icon-container">{props.type === "mobile" ? <img className="main-icon"src={bookIcon} alt="main icon" /> :  <img className="main-icon" src={mailIcon} alt="mail icon" /> }</div>
          <div className="main-container">
          <div className="field-text-verification">Verification Code</div>
          <input className={`input-field field-one ${errorCode && 'error'}`} maxLength={6} type="text" placeholder="Verification Code" value={code} onChange={(e) => setCode(e.target.value)} />
          {errorCode && <div className="error-message">{errorCode}</div>}
          <div className="continue-button-container">
            <button className="continue-button" onClick={handleContinue}>Continue</button>
          </div>
        </div>
        <br/>
        <div className="switch-text"><div>Didn't receive code? <Link to="#">Resend code</Link></div><div>OR</div><div><a onClick={handleSwitch}>{props.label}</a></div></div>
        <br/>
        <br/>
        </div>
        <div ref={recaptchaWrapperRef}>
        <div id="recaptcha-container"></div>
        </div>
    </div>
  );
};

export default VerificationCardComponent;