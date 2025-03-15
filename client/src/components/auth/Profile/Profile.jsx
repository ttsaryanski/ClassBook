import { useEffect, useState } from "react";

import { useAuth } from "../../../contexts/AuthContext";

import { dataService } from "../../../services/dataService";
import { authService } from "../../../services/authService";
import { fromIsoToString } from "../../../utils/setDateString";

import styles from "./Profile.module.css";
import EditProfile from "../EditProfile/EditProfile";

export default function Profile() {
    const { user, updateUser } = useAuth();

    const [picture, setPicture] = useState({});
    const [speciality, setSpeciality] = useState("");
    const [isTeacher, setIsTeacher] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

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

    const editUser = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target.parentElement.parentElement);
        const userData = Object.fromEntries(formData);

        if (userData.imageUrl === "") {
            userData.imageUrl = null;
        }

        const editedUser = await authService.editUser(user._id, userData);
        updateUser(editedUser);

        setShowEdit(false);
    };

    const showEditView = () => {
        setShowEdit(true);
    };

    const closeEditView = () => {
        setShowEdit(false);
    };

    return (
        <>
            {showEdit && (
                <EditProfile
                    user={user}
                    isTchr={isTeacher}
                    onClose={closeEditView}
                    onEdit={editUser}
                />
            )}

            <div className={`${styles.details} detail-container`}>
                <header className={`${styles.headers} headers`}>
                    <h2>User Detail</h2>
                </header>
                <div className={`${styles.content} content`}>
                    <div className="image-container">
                        {picture ? (
                            <img
                                src={picture.fileUrl}
                                alt={`${user?.firstName} ${user?.lastName}`}
                                className="image"
                            />
                        ) : (
                            <img src="/profile.png" alt="Default profile" />
                        )}
                    </div>
                    <div className="user-details">
                        <p>
                            Full Name:{" "}
                            <strong>
                                {user?.firstName} {user?.lastName}
                            </strong>
                        </p>
                        <p>
                            Email: <strong>{user?.email}</strong>
                        </p>
                        <p>
                            Status: <strong>{user?.role}</strong>
                        </p>

                        {isTeacher && (
                            <p>
                                Speciality: <strong>{user?.speciality}</strong>
                            </p>
                        )}

                        <p>
                            Created on:{" "}
                            <strong>
                                {fromIsoToString(user?.dateCreated)}
                            </strong>
                        </p>
                        <p>
                            Modified on:{" "}
                            <strong>{fromIsoToString(user?.dateUpdate)}</strong>
                        </p>
                    </div>
                </div>

                <button
                    className={styles.btn_edit}
                    title="edit"
                    onClick={showEditView}
                >
                    Edit
                </button>
            </div>
        </>
    );
}
