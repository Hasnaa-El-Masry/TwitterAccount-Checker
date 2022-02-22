import React from "react";
import { useHistory } from "react-router-dom";
import TwitterInfo from "../../components/TwitterInfo";
import Wrapper from "../../components/UI/Wrapper";
import UserInfo from "../../components/UserInfo";

function Welcome() {
  const history = useHistory();

  const user = history.location.state;
  
  return (
    <div style={{display:"flex",justifyContent:"space-around"}}>
      <Wrapper>
        <TwitterInfo userName={user?.username} />
      </Wrapper>
      <Wrapper>
        <UserInfo user={user} />
      </Wrapper>
    </div>
  );
}

export default Welcome;
