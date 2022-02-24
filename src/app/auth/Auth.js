import { setUserData } from "app/auth/store/userSlice";
import { useDispatch } from "react-redux";
import jwtService from "app/services/jwtService";

export default function Auth(props) {
  const dispatch = useDispatch();
  dispatch(setUserData(JSON.parse(window.localStorage.getItem("User"))));
  jwtService.handleAuthentication();
  {
    return <>{props.children}</>;
  }
}
