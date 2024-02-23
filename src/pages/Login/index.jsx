import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/slices/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export const Login = () => {
    const isAuth = useSelector(state => Boolean(state.auth.user?.data) || window.localStorage.getItem('token'))
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: 'test@test.com',
            password: '12345',
        }
    })

    const onSubmit = async ({email, password}) => {
        const {payload} = await dispatch(fetchUser({email, password}))

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
                    Вход в аккаунт
                </Typography>
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
                    label={errors.password?.message}
                    error={Boolean(errors.password?.message)}
                    fullWidth
                    defaultValue=""
                    {...register("password", {required: 'password is required'})}
                />
                <Button size="large" variant="contained" fullWidth type='submit'>
                    Войти
                </Button>
            </Paper>
        </form>
    );
};
