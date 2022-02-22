import { Button, Result } from "antd";
import { useContext } from "react";
import { Link, Route } from "react-router-dom";
import { AuthContext } from "../AuthContext/authContext";

const AuthMiddleware = ({ component: Component, ...rest }) => {
  const { isLogin } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
              <Button type="primary">
                <Link to="/login">Login</Link>
              </Button>
            }
          />
        )
      }
    />
  );
};

export default AuthMiddleware;
