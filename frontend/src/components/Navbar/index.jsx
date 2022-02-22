import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { AuthContext } from "../../AuthContext/authContext";
import { Button } from "antd";
import { ReactComponent as Twitter } from '../../assets/Icons/twitter.svg';

function Navbar() {
  const { isLogin } = useContext(AuthContext);
  const { logout, resetAccountHandler } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
    resetAccountHandler();
  };


  return (
    <nav className={styles.nav}>
      <div className={styles.nav__logo}>
        <Twitter/>
        <h1>Twitter Account Checker</h1>
      </div>
      <div>
        {isLogin && (
          <div>
            <Button onClick={logoutHandler}>Logout</Button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
