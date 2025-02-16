import React, { Fragment, useRef, useState } from "react";
import { Accordion, Container, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import {
  AiOutlineBank,
  AiOutlineUnorderedList,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineUser,
} from "react-icons/ai";
import {
  BsBagPlus,
  BsBagX,
  BsBox,
  BsCartPlus,
  BsCircle,
  BsGraphUp,
  BsPeople,
} from "react-icons/bs";
import { RiDashboardLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { IoCreateOutline } from "react-icons/io5";
import AuthModels from "./Modals/AuthModels";
// import logo from "../../assets/images/Logo.svg";
// import {getUserDetails, removeSessions} from "../../helper/SessionHelper";
export default () => {
  const getUserDetails = "";
  let contentRef,
    sideNavRef,
    topNavRef = useRef();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const MenuBarClickHandler = () => {
    let sideNav = sideNavRef;
    let content = contentRef;
    let topNav = topNavRef;
    if (sideNav.classList.contains("side-nav-open")) {
      sideNav.classList.add("side-nav-close");
      sideNav.classList.remove("side-nav-open");
      content.classList.add("content-expand");
      content.classList.remove("content");
      topNav.classList.remove("top-nav-open");
      topNav.classList.add("top-nav-close");
    } else {
      sideNav.classList.remove("side-nav-close");
      sideNav.classList.add("side-nav-open");
      content.classList.remove("content-expand");
      content.classList.add("content");
      topNav.classList.add("top-nav-open");
      topNav.classList.remove("top-nav-close");
    }
  };

  const isSidebarAccordionActive = () => {
    let urlList = [];
    sidebarItems.map((item) => {
      urlList.push(
        item.subMenu.map((subItem) => {
          return subItem?.url;
        })
      );
    });
    return urlList.findIndex((items) =>
      items.includes(window.location.pathname)
    );
  };

  const sidebarItems = [
    {
      title: "Home",
      icon: <RiDashboardLine className="side-bar-item-icon" />,
      url: "/admin",
      subMenu: [],
    },

    {
      title: "agent",
      icon: <BsCartPlus className="side-bar-item-icon" />,

      subMenu: [
        {
          title: "Agent-List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "agentlist",
        },
        {
          title: "Agent-user-list",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "agentusers",
        },
        {
          title: "Agent-Widthraw",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "agentWidthraw",
        },
        {
          title: "Agent-Deposit",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "agentdeposit",
        },
      ],
    },
    {
      title: "affiliate",
      icon: <BsCartPlus className="side-bar-item-icon" />,

      subMenu: [
        {
          title: "affiliate-List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "contactus",
        },
        {
          title: "affiliate-Widthrow",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "contactus",
        },
        {
          title: "affiliate-user",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        {
          title: "Affiliate-User-Widthrow",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        {
          title: "Affiliate-User-Deposit",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
      ],
    },
    {
      title: "user",
      icon: <BsCartPlus className="side-bar-item-icon" />,

      subMenu: [
        {
          title: "All-User",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "contactus",
        },
        {
          title: "Affiliate-User",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        {
          title: "Agent-User",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        {
          title: "Sub-Agent-User",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
      ],
    },
    {
      title: "sub-agent",
      icon: <BsCartPlus className="side-bar-item-icon" />,

      subMenu: [
        {
          title: "Sub-Agent-List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "contactus",
        },
        {
          title: "Sub-Agent-user",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        
        {
          title: "Sub-Agent-Deposit",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        {
          title: "Sub-Agent-report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
      ],
    },
    {
      title: "getway",
      icon: <BsCartPlus className="side-bar-item-icon" />,

      subMenu: [
        {
          title: "admin-getway",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "contactus",
        },
        {
          title: "adminwallet",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        {
          title: "AgentUser",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
      ],
    },
    {
      title: "sub-agent",
      icon: <BsCartPlus className="side-bar-item-icon" />,

      subMenu: [
        {
          title: "Sub-Agent-List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "contactus",
        },
        {
          title: "Sub-Agent-user",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        
        {
          title: "Sub-Agent-Deposit",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        {
          title: "Sub-Agent-report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
      ],
    },
    {
      title: "Contactus",
      icon: <BsBox className="side-bar-item-icon" />,
      url: "contactus",
      subMenu: [],
    },
    {
      title: "gamesblog",
      icon: <BsBagPlus className="side-bar-item-icon" />,
      url: "gamesblog",
      subMenu: [],
    },
    {
      title: "LiveContact",
      icon: <BsCartPlus className="side-bar-item-icon" />,

      subMenu: [
        {
          title: "Live Chat",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "contactus",
        },
        {
          title: "Telegram",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        {
          title: "Facebook",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
        {
          title: "Support-Email",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "https://wa.me/qr/5JXNJBZKCIKZA1 ",
        },
      ],
    },
    {
      title: "Return",
      icon: <BsBagX className="side-bar-item-icon" />,
      url: "/Return",
      subMenu: [
        {
          title: "New Return",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/ReturnCreateUpdatePage",
        },
        {
          title: "Return List",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/ReturnListPage",
        },
      ],
    },
    {
      title: "Report",
      icon: <BsGraphUp className="side-bar-item-icon" />,
      url: "/Report",
      subMenu: [
        {
          title: "Sale Report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/SaleReportPage",
        },
        {
          title: "Return Report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/ReturnReportPage",
        },
        {
          title: "Purchase Report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/PurchaseReportPage",
        },
        {
          title: "Expense Report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "/ExpenseReportPage",
        },
      ],
    },
  ];

  const onLogout = () => {
    // removeSessions();
  };
  return (
    <Fragment>
      <Navbar className="fixed-top px-0 ">
        <Container fluid={true}>
          <Navbar.Brand>
            <div
              ref={(div) => {
                topNavRef = div;
              }}
              className="top-nav-open"
            >
              <h4 className="text-white m-0 p-0">
                <a onClick={MenuBarClickHandler}>
                  <AiOutlineMenu />
                </a>
              </h4>
            </div>
          </Navbar.Brand>

          <div className="float-right h-auto d-flex align-items-center">
            <div className="header-desktop__former">
              <div className="header-desktop__latter">
                <div className="header-desktop__item header-desktop__auth-container auth-container ">
                  <button
                    className="auth-container__button auth-container__button--primary "
                    onClick={handleShow}
                  >
                    Login
                  </button>
                  <button className="auth-container__button auth-container__button--secondary ">
                    SignUp
                  </button>
                </div>

                <div className="header-desktop__item header-desktop__lang-switch">
                  <img
                    src="https://img.c88rx.com/cx/h5/assets/images/flag/BD.png?v=1732008579870&source=mcdsrc"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>

      <div
        ref={(div) => {
          sideNavRef = div;
        }}
        className="side-nav-open border-radius-0 "
      >
        <NavLink
          to="/"
          end
          className="d-flex  justify-content-center sticky-top "
        >
          <p className="logo">Logo</p>
        </NavLink>

        <Accordion defaultActiveKey={`${isSidebarAccordionActive()}`}>
          {sidebarItems.map((item, index) => {
            return item.subMenu.length !== 0 ? (
              <Accordion.Item
                key={index.toString()}
                eventKey={`${index}`}
                className=" border-0"
              >
                <Accordion.Header>
                  <NavLink className="side-bar-item " to={item?.url}>
                    {item.icon}
                    <span className="side-bar-item-caption">{item.title}</span>
                  </NavLink>
                </Accordion.Header>
                <Accordion.Body>
                  {item.subMenu.map((subItem, index) => (
                    <NavLink
                      key={index.toString()}
                      className={(navData) =>
                        navData.isActive
                          ? "side-bar-subitem-active side-bar-subitem "
                          : "side-bar-subitem"
                      }
                      to={subItem.url}
                      end
                    >
                      {subItem?.icon}
                      <span className="side-bar-subitem-caption">
                        {subItem?.title}
                      </span>
                    </NavLink>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ) : (
              <NavLink
                className={(navData) =>
                  navData.isActive
                    ? "side-bar-item-active side-bar-item "
                    : "side-bar-item "
                }
                to={item.url}
                end
              >
                {item.icon}
                <span className="side-bar-item-caption">{item.title}</span>
              </NavLink>
            );
          })}
        </Accordion>
      </div>

      <div ref={(div) => (contentRef = div)} className="content">
        <Outlet />
        <AuthModels show={show} handleClose={handleClose}></AuthModels>
      </div>
    </Fragment>
  );
};
