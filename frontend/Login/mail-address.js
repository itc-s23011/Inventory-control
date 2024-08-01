import styles from "@/styles/mail-address.module.css";


const MailAddress = () => {
    return (
        <input
            className={styles.mail_address}
            type="text"
            placeholder="email@icloud.com"
        />
    )
}
export default MailAddress