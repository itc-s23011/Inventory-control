import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const Login = () => {
    const [isRevealPassword, setIsRevealPassword] = useState(false);

    const togglePassword = () => {
        setIsRevealPassword((prevState) => !prevState);
    };

    return (
        <div style={{ width: 499, height: 592, position: 'relative' }}>

            {/*-----------------------メールアドレス--------------------------*/}
            <input
                type="text"
                placeholder="email@icloud.com"
                style={{
                    width: 499,
                    height: 79,
                    left: 0,
                    top: 20,
                    padding: 15,
                    position: 'absolute',
                    color: '#8E8585',
                    borderRadius: 24,
                    fontSize: 28,
                    fontFamily: 'Inter',
                    fontWeight: '400',
                    wordWrap: 'break-word'
                }}
            />

            {/*-----------------------パスワード--------------------------*/}
            <div>
                <input
                    type={isRevealPassword ? "text" : "password"}
                    placeholder="password"
                    style={{
                        width: 499,
                        height: 79,
                        left: 0,
                        top: 127,
                        padding: 15,
                        position: 'absolute',
                        borderRadius: 24,
                        color: '#8E8585',
                        fontSize: 28,
                        fontFamily: 'Inter',
                        fontWeight: '400',
                        wordWrap: 'break-word',
                        letterSpacing: '1',
                    }}
                />

                {/*-----------------------パスワード（内容の表示・非表示）--------------------------*/}
                <span
                    onClick={togglePassword}
                    role="presentation"
                    style={{
                        position: 'absolute',
                        left: 440,
                        top: 158,
                    }}>
                    {isRevealPassword ? (
                        <i className="fas fa-eye" />
                    ) : (
                        <i className="fas fa-eye-slash" />
                    )}
                </span>
            </div>

            {/*-----------------------ログインボタン--------------------------*/}
            <button
                type="button"
                style={{
                    width: 200,
                    height: 80,
                    left: 300,
                    top: 230,
                    backgroundColor: 'white',
                    borderRadius: 24,
                    position: 'absolute',
                    color: '#2B2828',
                    fontSize: 32,
                    fontFamily: 'Inter',
                    fontWeight: '400',
                    wordWrap: 'break-word',
                    transition: 'background-color 0.2s transform 0.3s',
                }}
            >ログイン
            </button>

            {/*-----------------------新規登録ボタン--------------------------*/}
            <button
                type="button"
                style={{
                    width: 200,
                    height: 80,
                    left: 0,
                    top: 230,
                    position: 'absolute',
                    backgroundColor: 'white',
                    color: '#2B2828',
                    borderRadius: 24,
                    fontSize: 32,
                    fontFamily: 'Inter',
                    fontWeight: '400',
                    wordWrap: 'break-word',
                }}
            >
                新規登録
            </button>

            {/*-----------------------google--------------------------*/}
            <div
                style={{
                    width: 499,
                    height: 48,
                    left: 0,
                    top: 354,
                    position: 'absolute',
                    background: '#FF070C',
                    borderRadius: 24,
                }}
            />

            {/*-----------------------twitter--------------------------*/}
            <div
                style={{
                    width: 499,
                    height: 48,
                    left: 0,
                    top: 449,
                    position: 'absolute',
                    background: '#70CBF2',
                    borderRadius: 24,
                }}
            />
            {/*-----------------------github--------------------------*/}
            <div
                style={{
                    width: 499,
                    height: 48,
                    left: 0,
                    top: 544,
                    position: 'absolute',
                    background: 'black',
                    borderRadius: 24,
                }}
            />
        </div>
    );
};

export default function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <Login />
            </main>
        </>
    );
}
