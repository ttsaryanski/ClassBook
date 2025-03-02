import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.par}>
                This site is designed to be used for training purposes at
                SoftUni.
            </p>
        </footer>
    );
}
