import '../styles/pages/SuccessVerificationPage.css';
import successIcon from "../assets/icons/success-icon.svg";
import { useLocation, useNavigate } from 'react-router-dom';

const SuccessVerificationPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="success-verification-container"> 
      <div className="success-landing-title">Verification successful!</div>
      <div className="success-content-wrapper">
        <div className="main-icon-container"><img className="main-icon-success"src={successIcon} alt="main icon" /></div>
        <div className="tos-text-success">Verification succesful!</div>
        <button className="continue-button" onClick={() => 
        navigate('/table',{
          state:{
            idToken: location.state.idToken,
          }
        })}>To table</button>
      </div>
    </div>
  );
};

export default SuccessVerificationPage;