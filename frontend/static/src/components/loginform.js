import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const INITIAL_STATE = {
  username: "",
  password: "",
  email: "",
};

function LoginForm(props) {
  const [state, setState] = useState(INITIAL_STATE);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(state),
    };
    const response = await fetch("/dj-rest-auth/login/", options).catch(
      "handleError"
    );
    if (!response.ok) {
      throw new Error("newtwork response was not OK");
    }
    const data = await response.json();
    Cookies.set("Authorization", `Token ${data.key}`);
    props.setPage("channels");
  };
  const handleLogout = () => {
    Cookies.remove("Authorization");
  };

  return (
    <div className="loginpage">
      <form className="loginform" onSubmit={handleSubmit}>
        <label html="email">Enter Email</label>
        <input
          id="email"
          type="email"
          placeholder="enter email"
          name="email"
          value={state.email}
          onChange={handleInput}
        ></input>

        <label html="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="enter username"
          name="username"
          value={state.username}
          onChange={handleInput}
        ></input>

        <label html="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="enter password"
          name="password"
          value={state.password}
          onChange={handleInput}
        ></input>

        <button type="submit">Login</button>
        <button>Need an account?</button>
      </form>
    </div>
  );
}

export default LoginForm;
