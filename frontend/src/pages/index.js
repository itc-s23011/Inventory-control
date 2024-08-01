import Head from "next/head";
import styles from "@/styles/Home.module.css";
import MailAddress from "../../Login/mail-address";
import GoogleButton from "../../Login/google-button";
import LoginButton from "../../Login/login-button";
import TourokuButton from "../../Login/touroku-button";
import TwitterButton from "../../Login/twitter-button";
import GitHubButton from "../../Login/github-button";
import Login from "../../Login/password";


export default function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main}`}>
                <div className={styles.divdiv}>

                    {/*--メールアドレス--*/}
                    <MailAddress />


                    {/*--パスワード（内容の表示・非表示）--*/}
                    <Login />

                    {/*--ログインボタン--*/}
                    <LoginButton />

                    {/*--新規登録ボタン--*/}
                    <TourokuButton />

                    {/*--文章--*/}

                    {/*--google--*/}
                    <GoogleButton />

                    {/*--twitter--*/}
                    <TwitterButton />

                    {/*--github--*/}
                    <GitHubButton />

                </div>
            </main>
        </>
    );
};



