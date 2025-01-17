import React, { useRef, useEffect, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/header.css";

const userId = localStorage.getItem('userId');
 

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },

  {
    path: `/userorders`,
    display: "UserOrders",
  },
  {
    path: "/contact",
    display: "Contact",
  },
  
];
;
const Header = () => {
  const menuRef = useRef(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();


useEffect(() => {
    const Username = localStorage.getItem("username");
    setUsername(Username);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setUsername(null);
    navigate("/login");
  }

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className="header">
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>If you need help </span>
                <span className="header__top__help">
                  <i class="ri-phone-fill"></i> +250788282329
                </span>
              </div>
            </Col><Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
             
            </Col>

          </Row>
        </Container>
      </div>
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i class="ri-car-line"></i>
                    <span>
                  Carents
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Rwanda</h4>
                  <h6>Kigali</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Everyday</h4>
                  <h6>24 hours/7 of the week</h6>
                </div>
              </div>
            </Col>

            
          </Row>
        </Container>
      </div>

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
                
              </div>
              <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex">
      {username ? (
        <div className="d-flex align-items-center">
          <span className="username">{username}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" className="d-flex align-items-center">
          <i className="ri-login-circle-line"></i> Login
        </Link>
      )}
                
              </div>
            </Col>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
