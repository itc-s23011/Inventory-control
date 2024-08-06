import {Inter} from "next/font/google";
import {useState} from "react";
import styles from "@/styles/loginform.module.css"




const inter = Inter({ subsets: ["latin"] });

const LoginForm = () => {
    const [isRevealPassword, setIsRevealPassword] = useState(false);
    const togglePassword = () => {
        setIsRevealPassword((prevState) => !prevState);
    };
    return (
        <div>

            {/*-----メールアドレス-----*/}
            <p className={styles.email_comment}>Email</p>
            <input
                className={styles.mail_address}
                type="text"
                placeholder="email@icloud.com"
            />

            {/*-----パスワード(内容表示・非表示機能付き)-----*/}
            <p className={styles.email_comment2}>password</p>
            <input
                type={isRevealPassword ? "text" : "password"}
                placeholder="123456789"
                className={styles.password_text}
            />
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
        </div>


    )
}
export default LoginForm