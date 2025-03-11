import { useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../context/AuthContext";

import styles from "./Header.module.css";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    return (
        <>
            <div className={styles.status}>
                {user ? (
                    <span className={styles.role}>
                        Welcome: {`${user.firstName} ${user.lastName}`}
                    </span>
                ) : (
                    <span className={styles.role}>Welcome: guest</span>
                )}

                {user ? (
                    <span className={styles.role}>
                        User status: {user.role}
                    </span>
                ) : (
                    ""
                )}
            </div>

            <div className={styles.header}>
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

                <div className={styles.status_responsive}>
                    {user ? (
                        <span className={styles.role}>
                            Welcome: {`${user.firstName} ${user.lastName}`}
                        </span>
                    ) : (
                        <span className={styles.role}>Welcome: guest</span>
                    )}

                    {user ? (
                        <span className={styles.role}>
                            User status: {user.role}
                        </span>
                    ) : (
                        ""
                    )}
                </div>

                <button
                    className={styles.burger}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    &#9776;
                </button>

                <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
                    <ul className={styles.ul}>
                        <li className={styles.list}>
                            <Link className={styles.link} to="/">
                                Home
                            </Link>
                        </li>
                        <li className={styles.list}>
                            <Link className={styles.link}>Teachers</Link>
                            <ul className={styles.ul}>
                                <li className={styles.list}>
                                    <Link className={styles.link} to="/class_1">
                                        Class Room 1
                                    </Link>
                                </li>
                                <li className={styles.list}>
                                    <Link
                                        className={styles.link}
                                        to="/archive/feb-2024"
                                    >
                                        Class Room 2
                                    </Link>
                                </li>
                                <li className={styles.list}>
                                    <Link
                                        className={styles.link}
                                        to="/archive/mar-2024"
                                    >
                                        Class Room 3
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.list}>
                            <Link className={styles.link}>Students</Link>
                            <ul className={styles.ul}>
                                <li className={styles.list}>
                                    <Link
                                        className={styles.link}
                                        to="/archive/jan-2024"
                                    >
                                        Class Room 1
                                    </Link>
                                </li>
                                <li className={styles.list}>
                                    <Link
                                        className={styles.link}
                                        to="/archive/feb-2024"
                                    >
                                        Class Room 2
                                    </Link>
                                </li>
                                <li className={styles.list}>
                                    <Link
                                        className={styles.link}
                                        to="/archive/mar-2024"
                                    >
                                        Class Room 3
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.list}>
                            <Link className={styles.link} to="/contacts">
                                Contacts
                            </Link>
                        </li>
                        <li className={`${styles.list} ${styles.last}`}>
                            <Link className={styles.link}>
                                <i className="fa-solid fa-right-to-bracket"></i>
                            </Link>
                            <ul className={styles.ul}>
                                {user ? (
                                    <li className={styles.list}>
                                        <button
                                            onClick={logout}
                                            className={`${styles.link} ${styles.button_link}`}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                ) : (
                                    <>
                                        <li className={styles.list}>
                                            <Link
                                                className={styles.link}
                                                to="/auth/login"
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li className={styles.list}>
                                            <Link
                                                className={styles.link}
                                                to="/auth/register"
                                            >
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
