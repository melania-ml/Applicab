import jwtService from "app/services/jwtService";

export default function Auth(props) {
  jwtService.handleAuthentication();
  {
    return <>{props.children}</>;
  }
}
