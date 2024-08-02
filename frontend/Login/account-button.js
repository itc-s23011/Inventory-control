import styles from "@/styles/account-button.module.css"


const AccountButton = () => {
    return (
        <div>
            {/*---Google---*/}

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

            {/*---Twitter---*/}

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.link2}>
                <button className={styles.Btn2}>
        <span className={styles.svgContainer2}>
          <svg viewBox="0 0 24 24" height="1.6em">
            <path
                d="M23.5 4.5c-.9.4-1.9.6-2.9.7 1-.6 1.8-1.5 2.2-2.6-.9.5-1.9.8-2.9 1-.9-.9-2.1-1.5-3.4-1.5-2.6 0-4.7 2.1-4.7 4.7 0 .4.1.8.1 1.2-3.9-.2-7.3-2.1-9.6-4.6-1.3 2.2-.7 5.1 1.4 6.7-.8 0-1.6-.3-2.3-.7v.1c0 2.3 1.7 4.3 3.9 4.8-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 2 2.4 3.5 4.6 3.5-1.6 1.3-3.6 2-5.8 2-.4 0-.8 0-1.2-.1 2.2 1.4 4.8 2.2 7.6 2.2 9.1 0 14.1-7.5 14.1-14.1 0-.2 0-.5 0-.7.9-.7 1.7-1.6 2.4-2.6z"></path>
          </svg>
        </span>
                    <span className={styles.BG2}></span>
                </button>
            </a>

            {/*---Github---*/}

            <button className={styles.Btn3}>
      <span className={styles.svgContainer3}>
        <svg fill="white" viewBox="0 0 496 512" height="1.6em">
          <path
              d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
        </svg>
      </span>
                <span className={styles.BG3}></span>
            </button>
        </div>
    )
}
export default AccountButton