"use client";

import React, { useState } from 'react';
import { auth } from '../firebase'; // パスを適切に調整
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import s from '../styles/SignIn.module.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter(); // useRouter フックを使用

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('ログイン成功');
            router.push('/home'); // ログイン成功後のリダイレクト
        } catch (error) {
            setError(error.message);
        }
    };

    const navigateToSignUp = () => {
        router.push('/SignUp'); // SignUp.js への遷移
    };

    return (
        <div className={s.container}>
            <h1 className={s.heading}>Sign In</h1>
            <form onSubmit={handleSignIn} className={s.form}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className={s.input}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={s.input}
                />
                <div className={s.buttonGroup}>
                    <button type="button" className={s.button} onClick={navigateToSignUp}>新規登録</button>
                    <button type="submit" className={s.button}>Sign In</button>
                </div>
            </form>
            {error && <p className={s.error}>{error}</p>}
        </div>
    );
};

export default SignIn;
