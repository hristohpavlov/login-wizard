import { useNavigate } from "react-router-dom";
import '../styles/components/LandingCardComponent.css';
import classNames from "classnames";
import personIcon from "../assets/icons/person-icon.svg";
import userIcon from "../assets/icons/user-icon.svg";

interface LandingCardComponentProps{
    type: "login" | "register";
    navigateToUrl: string;
    label: string;
    className?: string;
}

const LandingCardComponent  = (props: LandingCardComponentProps) => {
  const navigate = useNavigate();
  
  const onClick = () => {
    navigate(`${props.navigateToUrl}`);
  }
    return (
        <div className={classNames("card-container", props.className)}>
          <div className="card">
            <div className="icon">
              {
              props.type === "login" ? 
                <img className="logo"src={userIcon} alt="user icon" />
                  : 
                <img className="logo" src={personIcon} alt="person icon" />
                
              }
            </div>
            <div className="button-side">
              <div className="text-button">{props.type === "login" ? "I have an account" : "I'm new user"}</div>
              <button className="forward-button" onClick={onClick}>{props.label}</button>
            </div>
          </div>
          
        </div>
      );
}

export default LandingCardComponent

