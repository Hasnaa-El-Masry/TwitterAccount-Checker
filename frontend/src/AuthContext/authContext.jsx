import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [twitterAccount, setTwitterAccount] = useState(null);

  const logout = () => {
    setIsLogin(false);
  };

  const login = () => {
    setIsLogin(true);
  };

  const hasAccountHandler = (user)=>{
    setTwitterAccount(user);
  }

  const resetAccountHandler = (user)=>{
    setTwitterAccount(null);
  }

  return (
    <AuthContext.Provider value={{isLogin,logout,login, twitterAccount, hasAccountHandler, resetAccountHandler}}>{children}</AuthContext.Provider>
  );
};
