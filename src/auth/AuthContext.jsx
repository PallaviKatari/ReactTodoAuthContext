import React, {
  createContext,
  useState,
  useEffect
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const role = localStorage.getItem("role");

    if (token) {
      setUser({
        token,
        userName,
        role
      });
    }

  }, []);

  const login = (loginResponse) => {

    localStorage.setItem(
      "token",
      loginResponse.token
    );

    localStorage.setItem(
      "userName",
      loginResponse.userName
    );

    localStorage.setItem(
      "role",
      loginResponse.role
    );

    setUser({
      token: loginResponse.token,
      userName: loginResponse.userName,
      role: loginResponse.role
    });
  };

  const logout = () => {

    localStorage.clear();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin:
          user?.role?.toLowerCase() === "admin",
        isUser:
          user?.role?.toLowerCase() === "user"
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};