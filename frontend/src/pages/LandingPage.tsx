import LandingCardComponent from '../components/LandingCardComponent';
import '../styles/pages/LandingPage.css';

const LandingPage = () => {

  return (
    <div className="landing-container">
      <div className="landing-title">Welcome to Website</div>
      <div className="additional-text">Keeping Communities Connected</div>
      <LandingCardComponent className="first-card" type="register" navigateToUrl="/mobile-email" label="Create Account"/>
      <LandingCardComponent className="second-card" type="login" navigateToUrl="/mobile-email" label="Login now"/>
    </div>
  );
};

export default LandingPage;