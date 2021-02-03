/* eslint-disable*/
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  NavLink,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import {isEmail} from "validator";
import "./../styles/home.scss";
import Input from "./input";

export const Home = () => {
  let history = useHistory();
  const emailRef = useRef("");
  const userRef = useRef("");
  const valRef = useRef(null);
  const [clear, setClear] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const getVal = (e) => {
    // console.log("set");
    // console.log(isEmail(emailRef.current.value));
    setClear(true);
  };

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      history.push("/chat");
    }
  }, []);

  const onEmail = (e) => {
    setEmail(() => e.target.value);
  };
  const onUser = (e) => {
    setUser(() => e.target.value);
  };
  return (
    <section className="home_wrapper">
      <div className="login">
        <div className="login_elements">
          <label
            htmlFor="email"
            className="label">
            YOUR EMAIL ADRESS:
          </label>
          <Input
            name="email"
            type="email"
            valref={emailRef}
            fnClear={clear}
            valProp={email}
            fnGet={onEmail}
            modus={true}
          />
          <label
            htmlFor="username"
            className="label">
            CHOOSE A USERNAME:
          </label>
          <Input
            name="username"
            valref={userRef}
            fnClear={clear}
            fnGet={onUser}
            valProp={user}
            modus={true}
          />
          <NavLink
            to={{
              pathname: "/profile",
              state: {
                username: user,
              },
            }}>
            <input
              onClick={getVal}
              className="submit_btn"
              type="submit"
              name="submit"
              value="Submit"></input>
          </NavLink>
        </div>
      </div>
    </section>
  );
};
