import styles from "@/styles/twitter-button.module.css"

const TwitterButton = () => {
    return (


        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
            <button className={styles.Btn}>
        <span className={styles.svgContainer}>
          <svg viewBox="0 0 24 24" height="1.6em">
            <path
                d="M23.5 4.5c-.9.4-1.9.6-2.9.7 1-.6 1.8-1.5 2.2-2.6-.9.5-1.9.8-2.9 1-.9-.9-2.1-1.5-3.4-1.5-2.6 0-4.7 2.1-4.7 4.7 0 .4.1.8.1 1.2-3.9-.2-7.3-2.1-9.6-4.6-1.3 2.2-.7 5.1 1.4 6.7-.8 0-1.6-.3-2.3-.7v.1c0 2.3 1.7 4.3 3.9 4.8-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 2 2.4 3.5 4.6 3.5-1.6 1.3-3.6 2-5.8 2-.4 0-.8 0-1.2-.1 2.2 1.4 4.8 2.2 7.6 2.2 9.1 0 14.1-7.5 14.1-14.1 0-.2 0-.5 0-.7.9-.7 1.7-1.6 2.4-2.6z"></path>
          </svg>
        </span>
                <span className={styles.BG}></span>
            </button>
        </a>
    )
}
export default TwitterButton