import { useRef, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { authService } from "../../../services/authService";

import styles from "./Register.module.css";

export default function Register() {
    const registerAbortControllerRef = useRef(null);
    const { login } = useAuth();
    const { setError } = useError();

    const [pending, setPending] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [secretKey, setSecretKey] = useState(null);
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        rePassword: "",
    });

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setSecretKey(null);
        setPassword("");
        setRePassword("");
    };

    const validateFirstName = (value) => {
        if (value.length < 3) {
            return "First name must be at least 3 characters long.";
        }
        return "";
    };

    const validateLastName = (value) => {
        if (value.length < 3) {
            return "Last name must be at least 3 characters long.";
        }
        return "";
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

    const validateRePassword = (value, password) => {
        if (value !== password) {
            return "Password missmatch!";
        }

        return "";
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (registerAbortControllerRef.current) {
            registerAbortControllerRef.current.abort();
        }
        registerAbortControllerRef.current = new AbortController();
        const signal = registerAbortControllerRef.current.signal;

        setPending(true);

        try {
            setError(null);
            await authService.register(
                {
                    firstName,
                    lastName,
                    email,
                    secretKey:
                        secretKey && secretKey.trim() !== "" ? secretKey : null,
                    password,
                },
                signal
            );

            await login(email, password, signal);
            clearForm();
        } catch (error) {
            if (error.name === "AbortError") {
                setError("Request was aborted:", error.message);
            } else {
                setError(error.message || "Registration failed.");
            }
            setPassword("");
            setRePassword("");
        } finally {
            setPending(false);
        }
    };

    const firstNameChangeHandler = (e) => {
        const value = e.target.value;
        setFirstName(value);
        setErrors((prev) => ({ ...prev, firstName: validateFirstName(value) }));
    };

    const lastNameChangeHandler = (e) => {
        const value = e.target.value;
        setLastName(value);
        setErrors((prev) => ({ ...prev, lastName: validateLastName(value) }));
    };

    const emailChangeHandler = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    };

    const secretKeyChangeHandler = (e) => {
        const value = e.target.value;
        setSecretKey(value);
    };

    const passwordChangeHandler = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    };

    const rePasswordChangeHandler = (e) => {
        const value = e.target.value;
        setRePassword(value);
        setErrors((prev) => ({
            ...prev,
            rePassword: validateRePassword(value, password),
        }));
    };

    const isFormValid =
        !errors.firstName &&
        !errors.lastName &&
        !errors.email &&
        !errors.password &&
        !errors.rePassword &&
        firstName &&
        lastName &&
        email &&
        password &&
        rePassword;

    return (
        <div className={styles.register}>
            <div
                className={`${styles.register_flex} flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8`}
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
                        Create an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={submitHandler}
                        className={`${styles.form} space-y-6}`}
                    >
                        <div className={styles.form_row}>
                            <label
                                htmlFor="firstName"
                                className={`${styles.label} ${styles.required} block text-sm/6 font-medium text-gray-900`}
                            >
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    placeholder="John"
                                    onChange={firstNameChangeHandler}
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={styles.form_row}>
                            <label
                                htmlFor="lastName"
                                className={`${styles.label} ${styles.required} block text-sm/6 font-medium text-gray-900`}
                            >
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    placeholder="Doe"
                                    onChange={lastNameChangeHandler}
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.lastName}
                                    </p>
                                )}
                            </div>
                        </div>

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
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={styles.form_row}>
                            <label
                                htmlFor="sicret"
                                className={`${styles.label} block text-sm/6 font-medium text-gray-900`}
                            >
                                Sicret key
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    id="sicret"
                                    name="sicret"
                                    value={secretKey ?? ""}
                                    placeholder="secretKey"
                                    onChange={secretKeyChangeHandler}
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                            </div>
                            <span className={styles.span}>
                                If you are a teacher please enter your key!
                            </span>
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
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={styles.form_row}>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="rePassword"
                                    className={`${styles.label} ${styles.required} block text-sm/6 font-medium text-gray-900`}
                                >
                                    Repeat Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    id="rePassword"
                                    name="rePassword"
                                    value={rePassword}
                                    placeholder="Repeat password"
                                    required
                                    onChange={rePasswordChangeHandler}
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                                {errors.rePassword && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.rePassword}
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
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p
                        className={`${styles.gow_to} mt-10 text-center text-sm/6 text-gray-500`}
                    >
                        You are already registered, please{" "}
                        <Link
                            className={`${styles.link} font-semibold text-indigo-600 hover:text-indigo-500`}
                            to="/auth/login"
                        >
                            Login
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
