import Title from "./TitleDiv";
import TopDiv from "./top-components/TopDiv";
import BottomDiv from "./bottom-components/BottomDiv";
import Navigation from "./Navigation";
import { useEffect ,useMemo} from "react";
import { loginState } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { setInitialCookieCurl, getCookieValidationCurl } from "../async-functions/async";
import { useNavigate } from "react-router-dom";
export default function MainContainer() {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const loginUser=useSelector(state=>state.loginState);
  useEffect(() => {
    if(loginUser!==""){
      setInitialCookieCurl({"userName":loginUser}).then(res=>{
        if (res["status"]!==0){
          navigate("../");
        }else{
          dispatch(loginState(res["userName"]));
        }
      });
    } else{
      getCookieValidationCurl().then(res=>{
        if (res.status!==200){
          navigate("../");
          return;
        } else{
          res.json().then(ret=>{
            console.log(ret);
            dispatch(loginState(ret["userName"]));
          });
        }
      });
    }
  }, []);
  return loginUser!==""? (
    <div className="yellow-2"
         container
         spacing={0}
         direction="column"
         alignItems="center"
         justifyContent="center"
         style={{ minHeight: "100vh" }}>
      <Navigation></Navigation>

      <div>
        <TopDiv />
      </div>
      <div>
        <BottomDiv />
      </div>
    </div>
  ):"";
}
