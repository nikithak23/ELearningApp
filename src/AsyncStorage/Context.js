import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        if (value !== null) {
          setIsLoggedIn(true);
          console.log(value);
        }
      } catch (error) {
        console.log('Error');
      }
    };
    retrieveData();
  }, []);

  const logoutHandler = async () => {
    try {
      const value = await AsyncStorage.removeItem('isLoggedIn');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
      setIsLoggedIn(false);
    } catch (error) {
      console.log('Error');
    }

    //localStorage.removeItem('isLoggedIn');
  };

  const loginHandler = async () => {
    try {
        setIsLoggedIn(true);
      await AsyncStorage.setItem('isLoggedIn', '1');
      //await AsyncStorage.setItem('token', token);
      console.log('Value set');
    } catch (error) {
      console.log(error);
    }

    //localStorage.setItem('isLoggedIn', '1');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler(),
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
