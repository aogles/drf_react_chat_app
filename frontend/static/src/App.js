import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ChannelsList from "./components/channels";
import LoginForm from "./components/loginform";
import "./App.css";

function App() {
  const [isAuth, setAuth] = useState(!!Cookies.get("Authorization"));

  return <> {isAuth ? <ChannelsList /> : <LoginForm setAuth={setAuth} />}</>;
}

export default App;
