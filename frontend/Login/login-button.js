import styles from "@/styles/login-button.module.css"

const LoginButton = () => {
    return (
        <div>
            <button
                type="button"
                className={styles.login_button}
            >ログイン</button>

            <button
                className={styles.touroku_button}
                type="button"
            >アカウントを作成</button>
        </div>
    )
}
export default LoginButton