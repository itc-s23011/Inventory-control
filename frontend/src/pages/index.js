"use client";

import React, { useState } from 'react';
import { auth } from '../firebase'; // パスを適切に調整
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import s from '../styles/SignIn.module.css';
import {Inter} from "next/font/google";
import styles from "@/styles/loginform.module.css";
import Comment from "../../Login/comment";
import AccountButton from "../../Login/account-button";

const inter = Inter({ subsets: ["latin"] });


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter(); // useRouter フックを使用
    const [isRevealPassword, setIsRevealPassword] = useState(false);

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('ログイン成功');
            router.push('/Folder'); // ログイン成功後のリダイレクト
        } catch (error) {
            setError(error.message);
        }
    };

    const navigateToSignUp = () => {
        router.push('/SignUp'); // SignUp.js への遷移
    };

    const togglePassword = () => {
        setIsRevealPassword((prevState) => !prevState);
    };

    return (
        <main className={`${s.main}`}>
            <h1 className={s.heading}>Sign In</h1>
            <div className={s.divdiv}>
                <form onSubmit={handleSignIn} className={s.form}>

                    <p className={s.email_comment}>Email</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@icloud.com"
                        className={s.mail_address}
                    />

                    <p className={s.email_comment2}>Password</p>
                    <input
                        type={isRevealPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="123456"
                        className={s.password_text}/>
                    <span
                        onClick={togglePassword}
                        role="presentation"
                        className={styles.password_parts}>
            {isRevealPassword ? (
                <i className="fas fa-eye"/>
            ) : (
                <i className="fas fa-eye-slash"/>
            )}
        </span>
                    <div className={s.buttonGroup}>
                        <button type="button" className={s.touroku_button} onClick={navigateToSignUp}>新規登録</button>
                        <button type="submit" className={s.login_button}>Sign In</button>
                    </div>
                </form>
                {error && <p className={s.error}>{error}</p>}

                <Comment/>

                <AccountButton/>

            </div>
        </main>
    );
};

export default SignIn;