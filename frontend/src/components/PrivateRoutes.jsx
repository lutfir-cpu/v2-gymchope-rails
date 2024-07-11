import { Navigate } from "react-router-dom";

const PrivateRoutes = (props)=> {
    const { children } = props;
    props.checkLoginStatus();

    return props.isLoggedIn ? (
      <>{children}</>
    ) : (
      <Navigate
        to="/"
      />
    )
}

export default PrivateRoutes;