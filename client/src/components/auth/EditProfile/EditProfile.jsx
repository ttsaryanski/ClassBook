import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { authService } from "../../../services/authService";
import { teacherService } from "../../../services/teacherService";

import Spinner from "../../shared/Spinner/Spinner";

import styles from "./EditProfile.module.css";

export default function EditProfile() {
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();
    const { setError } = useError();

    const [picture, setPicture] = useState({});
    const [isTeacher, setIsTeacher] = useState(false);
    const [teacherId, setTeacherId] = useState("");

    const [pending, setPending] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        speciality: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!user) {
            setIsLoading(true);
            return;
        }

        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setPicture(user.profilePicture?.fileUrl ? user.profilePicture : null);

        if (user?.role === "teacher") {
            setIsTeacher(true);

            setError(null);
            const fetchTeacher = async () => {
                try {
                    const result = await teacherService.searchTeacher(
                        user.email,
                        signal
                    );
                    const [teacher] = result;

                    setTeacherId(teacher._id);
                    setSpeciality(teacher.speciality || "");
                } catch (error) {
                    if (!signal.aborted) {
                        setError(
                            "Failed to load teacher data: ",
                            error.message
                        );
                    }
                }
            };
            fetchTeacher();
        }

        setIsLoading(false);
        return () => {
            abortController.abort();
        };
    }, [user, setError]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const userData = { firstName, lastName };

        // if (userData.imageUrl === "") {
        //     userData.imageUrl = null;
        // }

        setPending(true);
        setError(null);
        try {
            const editedUser = await authService.editUser(user._id, userData);
            if (isTeacher) {
                try {
                    userData.speciality = speciality;
                    await teacherService.editById(teacherId, userData);
                } catch (error) {
                    setError((prev) => [
                        ...(prev || []),
                        `Error editing teacher data.,
                            ${error.message || "Unknown error"}`,
                    ]);
                }
            }
            updateUser(editedUser);
            navigate("/auth/profile");
            clearForm();
        } catch (error) {
            setError((prev) => [
                ...(prev || []),
                `Error editing data.,
                    ${error.message || "Unknown error"}`,
            ]);
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

    const validateSpeciality = (value) => {
        if (value.length < 3) {
            return "Speciality must be at least 3 characters long.";
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

    const specialityChangeHandler = (e) => {
        const value = e.target.value;
        setSpeciality(value);
        setErrors((prev) => ({
            ...prev,
            speciality: validateSpeciality(value),
        }));
    };

    const isFormValid =
        !errors.firstName &&
        !errors.lastName &&
        !errors.speciality &&
        firstName &&
        lastName;

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setSpeciality("");
    };

    if (isLoading) {
        return <Spinner />;
    }

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
                                    <div
                                        className={`${styles.form_group} mt-2`}
                                    >
                                        <div className="flex">
                                            <span>
                                                <i
                                                    className={`${styles.icon} fa-solid fa-graduation-cap`}
                                                ></i>
                                            </span>
                                            <input
                                                type="text"
                                                id="speciality"
                                                name="speciality"
                                                value={speciality}
                                                onChange={
                                                    specialityChangeHandler
                                                }
                                            />
                                        </div>
                                        {errors.speciality && (
                                            <p className="text-danger midlle mt-1">
                                                {errors.speciality}
                                            </p>
                                        )}
                                    </div>
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
