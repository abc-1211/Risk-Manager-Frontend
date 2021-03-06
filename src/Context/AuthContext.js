import React, { useState, createContext, useEffect, useMemo } from "react";
import AuthService from "../Services/AuthService";

// creatng a context
export const AuthContext = createContext();

// we use object destructuring here, where ever if we iport this will give the function name as (AuthProvider)
// this children will be the App component
// pull out children, obAuthProviderject destructuring props
export default ({ children }) => {
  // the data we want to pass to the context using useState method.
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userValue = useMemo(() => ({userInfo, setUserInfo}), [userInfo, setUserInfo]);
  const IdValue = useMemo(() => ({userId, setUserId}), [userId, setUserId]);
  const authValue = useMemo(() => ({isAuthenticated, setIsAuthenticated}), [isAuthenticated, setIsAuthenticated]);

  // To check App is loaded(coz we are going to make a req to the server)
  const [isLoaded, setIsLoaded] = useState(false);

  const auth =  async() => {
    try {
        const data = await AuthService.isAuthenticated()
        // console.log(data);
        console.log(data.user._id)
            // update state using the data what we got from the server
            setUserInfo(data);
            setIsAuthenticated(data.user.isAuthenticated);
            // if user authenticated that mean browser is loaded, we can set it to true.
            setIsLoaded(true);          
    } catch (error) {
        console.log(`Error - AuthContext.js - isAuthenticated() - ${error}`);
    }
  // check, if user authenticated using authenticated end-point
}
  useEffect(() => {
    auth()
  },[]);

  return (
    <div>
      {/* set the data what we going to use in the contextApi, inside the provider's value property if browser is loaded. */}     
        <AuthContext.Provider
          value={{userValue , authValue, IdValue}}
        >
          {children}
        </AuthContext.Provider>
    </div>
  );
};
