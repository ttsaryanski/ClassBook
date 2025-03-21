import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { authService } from "../../../services/authService";
import { teacherService } from "../../../services/teacherService";

import styles from "./EditProfile.module.css";

export default function EditProfile() {
    const editAbortControllerRef = useRef();
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();
    const { setError } = useError();

    const [picture, setPicture] = useState({});
    const [isTeacher, setIsTeacher] = useState(false);

    const [pending, setPending] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
    });

    useEffect(() => {
        if (user?.profilePicture?.fileUrl) {
            setPicture(user.profilePicture);
        } else {
            setPicture(null);
        }

        if (user?.role === "teacher") {
            setIsTeacher(true);
        }
    }, [user]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (editAbortControllerRef.current) {
            editAbortControllerRef.current.abort();
        }

        editAbortControllerRef.current = new AbortController();
        const signal = editAbortControllerRef.current.signal;

        //const formData = new FormData(e.target);
        const userData = { firstName, lastName };

        // if (userData.imageUrl === "") {
        //     userData.imageUrl = null;
        // }

        setPending(true);

        try {
            setError(null);
            const editedUser = await authService.editUser(
                user._id,
                userData,
                signal
            );
            if (isTeacher) {
                await teacherService.editById(user._id, userData, signal);
            }
            updateUser(editedUser);
            navigate("/auth/profile");
            clearForm();
        } catch (error) {
            if (error.name === "AbortError") {
                setError("Request was aborted:", error.message);
            } else {
                setError("Error editing data:", error.message);
            }
        } finally {
            setPending(false);
        }
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

    const isFormValid =
        !errors.firstName && !errors.lastName && firstName && lastName;

    const clearForm = () => {
        setFirstName("");
        setLastName("");
    };

    return (
        <div className={styles.edit}>
            <div className={`${styles.modall_edit} modall`}>
                <div className={`${styles.edit_user} user-container`}>
                    <header className={`${styles.headers} headers`}>
                        <h2>Edit User</h2>
                    </header>
                    <form onSubmit={submitHandler} className={styles.form}>
                        <div className={`${styles.form_group} form-group`}>
                            <label
                                htmlFor="firstName"
                                className={styles.required}
                            >
                                First name
                            </label>
                            <div className="input-wrapper">
                                <div className={`${styles.form_group} mt-2`}>
                                    <div className="flex">
                                        <span>
                                            <i
                                                className={`${styles.icon} fa-solid fa-user`}
                                            ></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={firstName}
                                            onChange={firstNameChangeHandler}
                                        />
                                    </div>
                                    {errors.firstName && (
                                        <p className="text-danger midlle mt-1">
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.form_group} form-group`}>
                            <label
                                htmlFor="lastName"
                                className={styles.required}
                            >
                                Last name
                            </label>
                            <div className="input-wrapper">
                                <div className={`${styles.form_group} mt-2`}>
                                    <div className="flex">
                                        <span>
                                            <i
                                                className={`${styles.icon} fa-solid fa-user`}
                                            ></i>
                                        </span>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={lastName}
                                            onChange={lastNameChangeHandler}
                                        />
                                    </div>
                                    {errors.lastName && (
                                        <p className="text-danger midlle mt-1">
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={`${styles.form_group} form-group`}>
                            <label htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <span>
                                    <i
                                        className={`${styles.icon} fa-solid fa-envelope`}
                                    ></i>
                                </span>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    readOnly
                                    defaultValue={user?.email}
                                />
                            </div>
                        </div>

                        {isTeacher && (
                            <div className={`${styles.form_group} form-group`}>
                                <label htmlFor="speciality">Speciality</label>
                                <div className="input-wrapper">
                                    <span>
                                        <i
                                            className={`${styles.icon} fa-solid fa-graduation-cap`}
                                        ></i>
                                    </span>
                                    <input
                                        id="speciality"
                                        name="speciality"
                                        type="text"
                                        defaultValue={user?.speciality}
                                    />
                                </div>
                            </div>
                        )}

                        {/* <div className={`${styles.form_group} form-group`}>
                            <label htmlFor="imageUrl">Image Url</label>
                            <div className="input-wrapper">
                                <span>
                                    <i className={`${styles.icon} fa-solid fa-image`}></i>
                                </span>
                                <input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="text"
                                    defaultValue={user.imageUrl}
                                />
                            </div>
                        </div> */}

                        <div id="form-actions">
                            <button
                                id="action-save"
                                type="submit"
                                className={`btn btn-primary ${
                                    !isFormValid || pending
                                        ? "disabled opacity-50"
                                        : ""
                                }`}
                                disabled={!isFormValid || pending}
                                style={{
                                    cursor:
                                        !isFormValid || pending
                                            ? "not-allowed"
                                            : "pointer",
                                }}
                            >
                                Edit
                            </button>

                            <Link
                                id="action-cancel"
                                className="btn"
                                to={"/auth/profile"}
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                    <p className={styles.form}>
                        {" "}
                        All fields marked with
                        <span className={styles.required}></span> are required!
                    </p>
                </div>
            </div>
        </div>
    );
}
