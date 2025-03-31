import { Link } from "react-router";

import styles from "./Page404.module.css";

export default function Page404() {
    return (
        <div className={styles.page404}>
            <main className={styles.page404_main}>
                <div className={styles.textCenter}>
                    <p className={styles.logo404}>404</p>
                    <h1 className={styles.title}>Page not found</h1>
                    <p className={styles.description}>
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className={styles.buttonContainer}>
                        <Link to="/" className={styles.link}>
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
