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

  return (
  <>
    <Nav defaultActiveKey="/home" as="ul">
      <Nav.Item as="li">
        <Nav.Link href="/home">Active</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-1">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
    </Nav>
  
    {page === 'channels' &&  <ChannelsList />}
    {page === 'login' && <LoginForm setPage={setPage} />}
  </>
  );
}
  

export default App;
