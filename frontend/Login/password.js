import {Inter} from "next/font/google";
import {useState} from "react";
import styles from "@/styles/password.module.css"




const inter = Inter({ subsets: ["latin"] });

const Login = () => {
    const [isRevealPassword, setIsRevealPassword] = useState(false);
    const togglePassword = () => {
        setIsRevealPassword((prevState) => !prevState);
    };
    return (
        <div>
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
export default Login