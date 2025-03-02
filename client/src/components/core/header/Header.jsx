import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <div className={styles.media}>
                    <Link to="/">
                        <img
                            className={styles.img}
                            src="/footer_logo_white_cropped-min.png"
                            alt="Logo"
                        />
                    </Link>
                </div>
                <span className={styles.course}>НАГ Васил Априлов</span>
            </div>

            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li className={styles.list}>
                        <Link className={styles.link} to="/">
                            Home
                        </Link>
                    </li>
                    <li className={styles.list}>
                        <Link className={styles.link} to="/blog">
                            Blog
                        </Link>
                    </li>
                    <li className={styles.list}>
                        <Link className={styles.link} to="/archive">
                            Archive
                        </Link>
                        <ul className={styles.ul}>
                            <li className={styles.list}>
                                <Link
                                    className={styles.link}
                                    to="/archive/jan-2024"
                                >
                                    Jan 2024
                                </Link>
                            </li>
                            <li className={styles.list}>
                                <Link
                                    className={styles.link}
                                    to="/archive/feb-2024"
                                >
                                    Feb 2024
                                </Link>
                            </li>
                            <li className={styles.list}>
                                <Link
                                    className={styles.link}
                                    to="/archive/mar-2024"
                                >
                                    Mar 2024
                                </Link>
                            </li>
                            <li className={styles.list}>
                                <Link
                                    className={styles.link}
                                    to="/archive/apr-2024"
                                >
                                    Apr 2024
                                </Link>
                            </li>
                            <li className={styles.list}>
                                <Link
                                    className={styles.link}
                                    to="/archive/may-2024"
                                >
                                    May 2024
                                </Link>
                            </li>
                            <li className={styles.list}>
                                <Link
                                    className={styles.link}
                                    to="/archive/jun-2024"
                                >
                                    Jun 2024
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={styles.list}>
                        <Link className={styles.link} to="/about">
                            About
                        </Link>
                        <ul className={styles.ul}>
                            <li className={styles.list}>
                                <Link className={styles.link} to="/about/me">
                                    About me
                                </Link>
                            </li>
                            <li className={styles.list}>
                                <Link className={styles.link} to="/about/all">
                                    About All
                                </Link>
                                <ul className={styles.ul}>
                                    <li className={styles.list}>
                                        <Link
                                            className={styles.link}
                                            to="/about/me2"
                                        >
                                            About me 2
                                        </Link>
                                    </li>
                                    <li className={styles.list}>
                                        <Link
                                            className={styles.link}
                                            to="/about/all2"
                                        >
                                            About All 2
                                        </Link>
                                    </li>
                                    <li className={styles.list}>
                                        <Link
                                            className={styles.link}
                                            to="/about/more2"
                                        >
                                            About more 2
                                        </Link>
                                    </li>
                                    <li className={styles.list}>
                                        <Link
                                            className={styles.link}
                                            to="/about/last2"
                                        >
                                            About last one 2
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={styles.list}>
                                <Link className={styles.link} to="/about/more">
                                    About more
                                </Link>
                            </li>
                            <li className={styles.list}>
                                <Link className={styles.link} to="/about/last">
                                    About last one
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={styles.list}>
                        <Link className={styles.link} to="/contacts">
                            Contacts
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
