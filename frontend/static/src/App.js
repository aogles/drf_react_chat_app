import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ChannelsList from "./components/channels";
import LoginForm from "./components/loginform";
import Nav from "react-bootstrap/Nav";
import "./App.css";

function App() {
  const [page, setPage] = useState(
    !!Cookies.get("Authorization") ? "channels" : "login"
  );

  const handleLogout = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      "handleError"
    );
    if (!response.ok) {
      throw new Error("newtwork response was not OK");
    }
    Cookies.remove("Authorization");
    setPage("login");
  };

  return (
    <>
      {page === "channels" && (
        <>
          <button onClick={() => setPage("channels")}>Home</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}

      {page === "channels" && <ChannelsList />}
      {page === "login" && <LoginForm setPage={setPage} />}
    </>
  );
}

export default App;
