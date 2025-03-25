import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useClass } from "../../../contexts/ClassContext";
import { useError } from "../../../contexts/ErrorContext";

import { teacherService } from "../../../services/teacherService";

import styles from "./Header.module.css";

export default function Header() {
    const { user, logout } = useAuth();
    const { clss } = useClass();
    const { setError } = useError();

    const [isOpen, setIsOpen] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    const [myClasses, setMyClasses] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchTeacherData = async () => {
            if (user?.role === "teacher") {
                try {
                    const teachers = await teacherService.getAll(signal);
                    const currentTeacher = teachers.find(
                        (teacher) => teacher._ownerId?.toString() === user._id
                    );

                    if (currentTeacher) {
                        setIsTeacher(true);

                        const teacherClasses = clss.filter((clss) =>
                            currentTeacher.clss?.includes(clss._id.toString())
                        );
                        setMyClasses(teacherClasses);
                    } else {
                        setIsTeacher(false);
                        setMyClasses([]);
                    }
                } catch (error) {
                    if (!signal.aborted) {
                        setError("Error fetching teacher data:", error.message);
                    }
                    setIsTeacher(false);
                    setMyClasses([]);
                }
            } else {
                setIsTeacher(false);
                setMyClasses([]);
            }
        };
        fetchTeacherData();

        return () => {
            abortController.abort();
        };
    }, [user, clss, setError]);

    return (
        <div className={styles.header}>
            <div className={styles.status}>
                {user ? (
                    <span className={styles.role}>
                        User status: {user.role}
                    </span>
                ) : (
                    <span className={styles.role}>User status: guest</span>
                )}

                {user ? (
                    <span className={styles.role}>
                        Welcome: {`${user.firstName} ${user.lastName}`}
                    </span>
                ) : (
                    ""
                )}
            </div>

            <div className={styles.header_wrapper}>
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
                            <Link className={styles.link} to="/classes">
                                Classes
                            </Link>
                            {user && clss.length > 0 && (
                                <ul className={styles.ul}>
                                    {clss
                                        .slice()
                                        .sort((a, b) =>
                                            a.title.localeCompare(b.title)
                                        )
                                        .map((cls) => (
                                            <li
                                                key={cls._id}
                                                className={styles.list}
                                            >
                                                <Link
                                                    className={styles.link}
                                                    to={`/class/${cls._id}`}
                                                >
                                                    {cls.title}
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </li>

                        {isTeacher && (
                            <li className={styles.list}>
                                <Link className={styles.link}>
                                    Teacher classes
                                </Link>
                                {myClasses.length > 0 && (
                                    <ul className={styles.ul}>
                                        {myClasses.map((clss) => (
                                            <li
                                                key={clss._id}
                                                className={styles.list}
                                            >
                                                <Link
                                                    className={styles.link}
                                                    to={`/class/${clss._id}`}
                                                >
                                                    {clss.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        )}

                        <li className={styles.list}>
                            <Link className={styles.link} to="/students">
                                Students
                            </Link>
                            {/* <ul className={styles.ul}>
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
                            </ul> */}
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
                                    <>
                                        <li className={styles.list}>
                                            <Link
                                                className={styles.link}
                                                to="/auth/profile"
                                            >
                                                My Profile
                                            </Link>
                                        </li>
                                        <li className={styles.list}>
                                            <button
                                                onClick={logout}
                                                className={`${styles.link} ${styles.button_link}`}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </>
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
        </div>
    );
}
