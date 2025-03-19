import { useRef, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";

import styles from "./Login.module.css";

export default function Login() {
    const loginAbortControllerRef = useRef(null);
    const { login } = useAuth();

    const [pending, setPending] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errs, setErrs] = useState({
        email: "",
        password: "",
    });

    const clearForm = () => {
        setEmail("");
        setPassword("");
    };

    const validateEmail = (value) => {
        const emailRegex =
            /^[A-Za-z0-9._%+-]{3,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(value) ? "" : "Invalid email format.";
    };

    const validatePassword = (value) => {
        if (value.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (loginAbortControllerRef.current) {
            loginAbortControllerRef.current.abort();
        }
        loginAbortControllerRef.current = new AbortController();
        const signal = loginAbortControllerRef.current.signal;

        setPending(true);

        try {
            await login(email, password, signal);
            clearForm();
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Login request was aborted:", error.message);
            } else {
                console.log("Error during login:", error.message);
            }
            setPassword("");
        } finally {
            setPending(false);
        }
    };

    const emailChangeHandler = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrs((prev) => ({ ...prev, email: validateEmail(value) }));
    };

    const passwordChangeHandler = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrs((prev) => ({ ...prev, password: validatePassword(value) }));
    };

    const isFormValid = !errs.email && !errs.password && email && password;

    return (
        <div className={styles.login}>
            <div
                className={`${styles.login_flex} flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className={styles.media}>
                        <img
                            alt="Your Company"
                            src="/footer_logo_white_cropped-min.png"
                            className={`${styles.img} mx-auto h-10 w-auto`}
                        />
                    </div>
                    <h2
                        className={`${styles.h2} mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900`}
                    >
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={submitHandler}
                        className={`${styles.form} space-y-6}`}
                    >
                        <div className={styles.form_row}>
                            <label
                                htmlFor="email"
                                className={`${styles.label} ${styles.required} block text-sm/6 font-medium text-gray-900`}
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    placeholder="john_doe@gmail.com"
                                    required
                                    onChange={emailChangeHandler}
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                                {errs.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errs.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={styles.form_row}>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className={`${styles.label} ${styles.required} block text-sm/6 font-medium text-gray-900`}
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    placeholder="password"
                                    required
                                    onChange={passwordChangeHandler}
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                                {errs.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errs.password}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={!isFormValid || pending}
                                className={`${
                                    styles.button
                                } flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                                ${
                                    !isFormValid || pending
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-blue-700"
                                }`}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p
                        className={`${styles.gow_to} mt-10 text-center text-sm/6 text-gray-500`}
                    >
                        Don't have an account?{" "}
                        <Link
                            className={`${styles.link} font-semibold text-indigo-600 hover:text-indigo-500`}
                            to="/auth/register"
                        >
                            Register
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
