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
            <input
                className={styles.mail_address}
                type="text"
                placeholder="email@icloud.com"
            />

            {/*-----パスワード(内容表示・非表示機能付き)-----*/}
            <input
                type={isRevealPassword ? "text" : "password"}
                placeholder="password"
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