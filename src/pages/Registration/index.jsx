import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { registerUser } from "../../store/slices/auth";
import { Navigate } from "react-router-dom";

export const Registration = () => {
    const isAuth = useSelector(state => Boolean(state.auth.user?.data || window.localStorage.getItem('token')))
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const onSubmit = async ({fullName, email, password}) => {
        const {payload} = await dispatch(registerUser({fullName, email, password}))

        if (payload?.data) {
            window.localStorage.setItem('token', payload.data.token);
        } else {
            alert('authorization failed');
        }
    }

    if (isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper classes={{root: styles.root}}>
                <Typography classes={{root: styles.title}} variant="h5">
                    Создание аккаунта
                </Typography>
                <div className={styles.avatar}>
                    <Avatar sx={{width: 100, height: 100}}/>
                </div>
                <TextField
                    className={styles.field}
                    label="Полное имя"
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    fullWidth
                    defaultValue=""
                    {...register("fullName", {required: 'Fullname is required'})}
                />
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    fullWidth
                    defaultValue=""
                    {...register("email", {required: 'Email is required'})}
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    fullWidth
                    defaultValue=""
                    {...register("password", {required: 'Password is required'})}

                />
                <Button size="large" variant="contained" fullWidth type='submit'>
                    Зарегестрироваться
                </Button>
            </Paper>
        </form>
    );
};
