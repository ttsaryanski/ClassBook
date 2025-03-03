import { Link } from "react-router-dom";

import styles from "./Register.module.css";

export default function Register() {
    return (
        <div className={styles.register}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="/footer_logo_white_cropped-min.png"
                        className={`${styles.img} mx-auto h-10 w-auto`}
                    />
                    <h2
                        className={`${styles.h2} mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900`}
                    >
                        Create an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        action="#"
                        method="POST"
                        className={`${styles.form} space-y-6}`}
                    >
                        <div className={styles.form_row}>
                            <label
                                htmlFor="firstName"
                                className={`${styles.label} block text-sm/6 font-medium text-gray-900`}
                            >
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    autoComplete="first-name"
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                            </div>
                        </div>

                        <div className={styles.form_row}>
                            <label
                                htmlFor="lastName"
                                className={`${styles.label} block text-sm/6 font-medium text-gray-900`}
                            >
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    autoComplete="last-name"
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                            </div>
                        </div>

                        <div className={styles.form_row}>
                            <label
                                htmlFor="email"
                                className={`${styles.label} block text-sm/6 font-medium text-gray-900`}
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                            </div>
                        </div>

                        <div className={styles.form_row}>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className={`${styles.label} block text-sm/6 font-medium text-gray-900`}
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                            </div>
                        </div>

                        <div className={styles.form_row}>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="rePassword"
                                    className={`${styles.label} block text-sm/6 font-medium text-gray-900`}
                                >
                                    Repeat Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="rePassword"
                                    name="rePassword"
                                    type="password"
                                    required
                                    autoComplete="current-rePassword"
                                    className={`${styles.input} block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`${styles.button} flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
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
