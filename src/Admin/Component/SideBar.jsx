import Sidebar from "react-bootstrap-sidebar-menu";
import React from "react";
import { MdCampaign, MdLeaderboard } from "react-icons/md";
import { FaHandshake, FaMessage } from "react-icons/fa6";
import { FaDownload, FaUsers } from "react-icons/fa";
import { IoLogoGameControllerB, IoMdSettings } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { TbAffiliate } from "react-icons/tb";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import "./SideBar.css";
import { Outlet } from "react-router-dom";

import { useSystem } from "../../Utils/System";

import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { useState } from "react";
export default ({ rotateded }) => {
  // import SideBar from "./SideBar";

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuIconClass = isOpen
    ? "fa-solid fa-less-than"
    : "fa-solid fa-greater-than";

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="logo_details" onClick={toggleSidebar}>
        <div id="btn">
          <div className="icon-circle ">
            <i class={`${menuIconClass}`}></i>
          </div>
        </div>
      </div>
      <div className="nav-list">
        <li>
          <Link to="agent">
            <i class="fa-duotone fa-solid fa-house"></i>
            <span className="link_name">Dashboard</span>
          </Link>
        </li>
        <li>
          <a href="">
            <i class="fa-solid fa-users"></i>
            <span className="link_name">Agent</span>
          </a>
        </li>
        <li>
          <a href="">
            <i class="fa-solid fa-plus"></i>
            <span className="link_name">Deposite</span>
          </a>
        </li>
        <li>
          <a href="">
            <i class="fa-solid fa-house"></i>
            <span className="link_name">Dashboard</span>
          </a>
        </li>
      </div>
    </div>
  );
};
