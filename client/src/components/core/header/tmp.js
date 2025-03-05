import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

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

            <button 
                className={styles.burger} 
                onClick={() => setIsOpen(!isOpen)}
            >
                &#9776;
            </button>

            <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
                <ul className={styles.ul}>
                    <li className={styles.list}>
                        <Link className={styles.link} to="/">Home</Link>
                    </li>
                    <li className={styles.list}>
                        <Link className={styles.link} to="/blog">Teachers</Link>
                    </li>
                    <li className={styles.list}>
                        <Link className={styles.link} to="/archive">Students</Link>
                    </li>
                    <li className={styles.list}>
                        <Link className={styles.link} to="/contacts">Contacts</Link>
                    </li>
                    <li className={styles.list}>
                        <Link className={styles.link} to="/auth/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

/* Header.module.css */

.header {
    width: 92%;
    height: 4rem;
    display: flex;
    margin: 1rem auto 0;
    align-items: center;
    justify-content: space-between;
    background: #f7f7f7;
    color: #369;
    padding: 2.5rem 0 4rem;
    border-bottom: 1px solid #369;
}

.logo {
    font-size: 1.5em;
    color: #369;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.logo .media {
    height: 4rem;
    background-color: #369;
    border-radius: 0.3em;
    overflow: hidden;
}

.logo .media:hover {
    transform: scale(1.1);
}

.logo .media .img {
    width: auto;
    height: 100%;
}

.logo .course {
    font-weight: bold;
}

.nav {
    z-index: 30;
}

.nav .ul {
    display: flex;
    gap: 1em;
    font-size: 16px;
}

.nav .ul .list, 
.nav .ul .list .link {
    display: block;
}

.nav .ul .list {
    position: relative;
}

.nav .ul .list .link {
    padding: 0.7em 1.5em;
    background: #369;
    color: #fff;
    text-decoration: none;
    border-radius: 0.3em;
}

.nav .ul .list:hover > .link,
.nav .ul .list .link:hover {
    background-color: lightblue;
    color: #369;
}

/* Mobile Styles */

.burger {
    display: none;
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #369;
}

@media (max-width: 768px) {
    .header {
        padding: 0 5%;
        height: 4rem;
    }
    .logo .course {
        display: none;
    }
    
    .burger {
        display: block;
    }

    .nav {
        display: none;
        position: absolute;
        top: 4rem;
        left: 0;
        width: 100%;
        background: #f7f7f7;
        flex-direction: column;
        text-align: center;
        box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
    }

    .nav.open {
        display: flex;
    }

    .nav .ul {
        flex-direction: column;
        gap: 0.5em;
    }
}
