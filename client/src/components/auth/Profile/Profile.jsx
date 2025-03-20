import { useEffect, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";

import { fromIsoToString } from "../../../utils/setDateString";

import styles from "./Profile.module.css";

export default function Profile() {
    const { user } = useAuth();

    const [picture, setPicture] = useState({});
    const [isTeacher, setIsTeacher] = useState(false);

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

    return (
        <>
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

                <Link
                    to={`/auth/profile/${user?._id}`}
                    className={styles.btn_edit}
                    title="edit"
                >
                    Edit
                </Link>
            </div>
        </>
    );
}
