import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/auth";

export const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => Boolean(state.auth.user?.data) || window.localStorage.getItem('token'))

  const handleLogoutClick = () => {
    window.localStorage.removeItem('token')
    dispatch(logout())
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>REACT BLOG</div>
          </Link>
          <div className={styles.buttons}>
            <Link to={'/register'}>
              <Button variant="contained">Создать аккаунт</Button>
            </Link>
            {isAuth ? <Link to={'/login'}>
              <Button color='error' variant="outlined" onClick={handleLogoutClick}>Выйти</Button>
            </Link> : <Link to={'/login'}>
              <Button variant="outlined">Войти</Button>
            </Link>}
          </div>
        </div>
      </Container>
    </div>
  );
};
