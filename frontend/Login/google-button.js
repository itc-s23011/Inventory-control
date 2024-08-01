import styles from "@/styles/google-button.module.css"

const GoogleButton = () => {
    return (
        <a href="https://google.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
            <button className={styles.Btn}>
        <span className={styles.svgContainer}>
          <svg viewBox="0 0 488 512" height="1.6em" fill="none">
  <path fill="#4285F4"
        d="M488 261.8c0-17.4-1.5-34.1-4.4-50.4H249v95.7h134.4c-5.8 31.2-23.2 57.5-49.6 75.1v62.3h80.2c46.8-43.2 74-106.9 74-182.7z"></path>
  <path fill="#34A853"
        d="M249 502c67.6 0 124.4-22.3 165.8-60.3l-80.2-62.3c-22.6 15.1-51.4 24.2-85.6 24.2-65.9 0-121.7-44.4-141.6-104.1H16.4v65.9C57.7 451.5 148.6 502 249 502z"></path>
  <path fill="#FBBC05"
        d="M107.4 316.8c-5.3-15.8-8.4-32.6-8.4-50.8s3.1-35 8.4-50.8V149.2H16.4C5.8 173.5 0 209.1 0 256s5.8 82.5 16.4 106.8l91-46z"></path>
  <path fill="#EA4335"
        d="M249 34c-70.3 0-134.8 24.6-186.1 65.4l91 46c19.9-59.7 75.7-104.1 141.6-104.1 35.7 0 67.6 12.4 93.1 36.7l69.8-69.8C318.6 34 249 34 249 34z"></path>
</svg>
            </span>
                <span className={styles.BG}></span>
            </button>
        </a>
    )
}
export default GoogleButton