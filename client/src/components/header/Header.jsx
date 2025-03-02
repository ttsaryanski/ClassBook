import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <div className={styles.media}>
                    <img
                        className={styles.img}
                        src="public/footer_logo_white_cropped-min.png"
                        alt=""
                    />
                </div>
                <span className={styles.course}>НАГ Васил Априлов</span>
            </div>

            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li className={styles.list}>
                        <a className={styles.a} href="#">
                            Home
                        </a>
                    </li>
                    <li className={styles.list}>
                        <a className={styles.a} href="#">
                            Blog
                        </a>
                    </li>
                    <li className={styles.list}>
                        <a className={styles.a} href="#">
                            Archive
                        </a>
                        <ul className={styles.ul}>
                            <li className={styles.list}>
                                <a className={styles.a} href="#">
                                    Jan 2024
                                </a>
                            </li>
                            <li className={styles.list}>
                                <a className={styles.a} href="#">
                                    Feb 2024
                                </a>
                            </li>
                            <li className={styles.list}>
                                <a className={styles.a} href="#">
                                    Mar 2024
                                </a>
                            </li>
                            <li className={styles.list}>
                                <a className={styles.a} href="#">
                                    Apr 2024
                                </a>
                            </li>
                            <li className={styles.list}>
                                <a className={styles.a} href="#">
                                    May 2024
                                </a>
                            </li>
                            <li className={styles.list}>
                                <a className={styles.a} href="#">
                                    Jun 2024
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className={styles.list}>
                        <a className={styles.a} href="#">
                            About
                        </a>
                        <ul className={styles.ul}>
                            <li className={styles.list}>
                                <a className={styles.a} href="#">
                                    About me
                                </a>
                            </li>
                            <li className={styles.list}>
                                <a className={styles.a} href="#">
                                    About All
                                </a>
                                <ul className={styles.ul}>
                                    <li className={styles.list} i>
                                        <a className={styles.a} href="#">
                                            About me 2
                                        </a>
                                    </li>
                                    <li className={styles.list}>
                                        <a className={styles.a} href="#">
                                            About All 2
                                        </a>
                                    </li>
                                    <li className={styles.list}>
                                        <a className={styles.a} href="#">
                                            About more 2
                                        </a>
                                    </li>
                                    <li className={styles.list}>
                                        <a className={styles.a} href="#">
                                            About last one 2
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className={styles.list}>
                                <a className={styles.a} href="#">
                                    About more
                                </a>
                            </li>
                            <li className={styles.list}>
                                <a className={styles.a} href="#">
                                    About last one
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className={styles.list}>
                        <a className={styles.a} href="#">
                            Contacts
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
