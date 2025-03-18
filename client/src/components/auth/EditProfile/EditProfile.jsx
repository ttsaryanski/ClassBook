import styles from "./EditProfile.module.css";

export default function EditProfile({
    user,
    isTchr,
    onClose,
    onEdit,
    pending,
}) {
    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose}></div>
            <div className="modall">
                <div className={`${styles.edit_user} user-container`}>
                    <header className={`${styles.headers} headers`}>
                        <h2>Edit User</h2>
                    </header>
                    <form>
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
                                    defaultValue={user.firstName}
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
                                    defaultValue={user.lastName}
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
                                    defaultValue={user.email}
                                />
                            </div>
                        </div>

                        {isTchr && (
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
                                        defaultValue={user.speciality}
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
                                onClick={onEdit}
                            >
                                Edit
                            </button>

                            <button
                                id="action-cancel"
                                className="btn"
                                type="button"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
