import React, { useEffect, useContext, useState } from "react";
import { Skeleton } from "antd";
import axios from "axios";
import { AuthContext } from "../../AuthContext/authContext";
import styles from "./styles.module.scss";

function TwitterInfo({userName}) {
  const [loading, setLoading] = useState(false);
  const {twitterAccount, hasAccountHandler, resetAccountHandler } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users`,{params:{screen_name:userName}}
      )

      .then((response) => {
        setLoading(false);

        hasAccountHandler(response.data)
       
      })
      .catch((err) => {
        setLoading(false);

        resetAccountHandler();
      });
  },[]);

  if(loading ){
    return <Skeleton/>
  }

  return (
    <div className={styles.twitter_info}>
      {!twitterAccount && (
        <div className={styles.twitter_info__notFount}>
          <h3>Sorry You don't Have a Twitter Account!</h3>
        </div>
      )}

      {twitterAccount && (
        <div className={styles.twitter_info_account}>
          <h3>{twitterAccount?.screen_name}</h3>
          <p><img src={twitterAccount?.profile_image_url}/></p>
          <p>{twitterAccount?.status?.text}</p>
        </div>
      )}
    </div>
  );
}

export default TwitterInfo;
