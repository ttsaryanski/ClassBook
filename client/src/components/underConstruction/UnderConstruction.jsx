import { Link } from "react-router";

import styles from "./UnderConstruction.module.css";

export default function UnderConstruction() {
    return (
        <div className={styles.page404}>
            <main className={styles.page404_main}>
                <div className={styles.textCenter}>
                    <p className={styles.logo404}>
                        <i className="fa-solid fa-laptop-code"></i>
                    </p>
                    <h1 className={styles.title}>Under Construction</h1>
                    <p className={styles.description}>
                        Coming soon. This functionality is still under
                        development.
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
