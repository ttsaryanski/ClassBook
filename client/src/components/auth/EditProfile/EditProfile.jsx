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

        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData);

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

    return (
        <div className={styles.edit}>
            <div className={`${styles.modall_edit} modall`}>
                <div className={`${styles.edit_user} user-container`}>
                    <header className={`${styles.headers} headers`}>
                        <h2>Edit User</h2>
                    </header>
                    <form onSubmit={submitHandler}>
                        <div className={`${styles.form_group} form-group`}>
                            <label htmlFor="firstName">First name</label>
                            <div className="input-wrapper">
                                <span>
                                    <i className="fa-solid fa-user"></i>
                                </span>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    defaultValue={user?.firstName}
                                />
                            </div>
                        </div>

                        <div className={`${styles.form_group} form-group`}>
                            <label htmlFor="lastName">Last name</label>
                            <div className="input-wrapper">
                                <span>
                                    <i className="fa-solid fa-user"></i>
                                </span>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    defaultValue={user?.lastName}
                                />
                            </div>
                        </div>

                        <div className={`${styles.form_group} form-group`}>
                            <label htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <span>
                                    <i className="fa-solid fa-envelope"></i>
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
                                        <i className="fa-solid fa-phone"></i>
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
                                    <i className="fa-solid fa-image"></i>
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
                                className="btn"
                                type="submit"
                                disabled={pending}
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
                </div>
            </div>
        </div>
    );
}
