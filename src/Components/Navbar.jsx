import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";

const Navbar = () => {
  return (
    <div className="nav">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <Link to="/create-post" className="create">
        Create
      </Link>
    </div>
  );
};

export default Navbar;
