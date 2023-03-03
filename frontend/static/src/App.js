import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ChannelsList from "./components/channels";
import LoginForm from "./components/loginform";
import Nav from "react-bootstrap/Nav";
import RegistrationForm from "./components/registrations";
import "./App.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";

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
    <div className="wrapper">
      {page === "channels" && (
        <>
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => setPage("channels")}>
              Home
            </Breadcrumb.Item>

            <Breadcrumb.Item onClick={handleLogout}>Logout</Breadcrumb.Item>
          </Breadcrumb>
          <h1 id="page-title">Click@Night</h1>
        </>
      )}

      {page === "channels" && <ChannelsList />}
      {page === "login" && <LoginForm setPage={setPage} />}
      {page === "registration" && <RegistrationForm setPage={setPage} />}
    </div>
  );
}

export default App;
