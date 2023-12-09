import Navbar from "./navbar/Navbar";
import "../styles/layout/Layout.css";

const Layout = ({children}: any) => {
    return (
        <div>
          <Navbar />
          <div className="content">{children}</div>
        </div>
      );
}

export default Layout;