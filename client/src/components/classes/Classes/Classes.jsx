import { useEffect, useState } from "react";

import { dataService } from "../../../services/dataService";

import OneClass from "../OneClass/OneClass";
import CreateClass from "../CreateClass/CreateClass";
import Pagination from "../../shared/Pagination";

import Search from "../../Search";
import Spinner from "../../Spinner";
import NotUsers from "../../NotUsers";
import NotSearchingResults from "../../NotSearchingResult";
import FetchError from "../../FetchError";
import UserDetails from "../../UserDetails";
import ShowDeleteUser from "../../UserDelete";

import styles from "./Classes.module.css";

export default function Classes() {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [showCreateClass, setShowCreateClass] = useState(false);
    const [showClassInfoById, setShowClassInfoById] = useState(null);
    const [showDelClassById, setShowDelClassById] = useState(null);
    const [showEditClassById, setShowEditClassById] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dataService.getAll();

                setClasses(result);
                setIsLoading(false);
            } catch (err) {
                console.log("Error fetching data:", err.message);
                setIsError(true);
            }
        };

        fetchData();
    }, []);

    const showCreateClassView = () => {
        setShowCreateClass(true);
    };

    const closeCreateClassView = () => {
        setShowCreateClass(false);
        setShowEditClassById(null);
    };

    const createClass = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target.parentElement.parentElement);
        const classData = Object.fromEntries(formData);

        const newClass = await dataService.createNew(classData);
        setClasses((state) => [...state, newClass]);

        setShowCreateClass(false);
    };

    const showEditClass = (classId) => {
        setShowEditClassById(classId);
    };

    const editClass = async (e) => {
        e.preventDefault();

        const classId = showEditClassById;
        const formData = new FormData(e.target.parentElement.parentElement);
        const classData = Object.fromEntries(formData);

        const updatedClass = await dataService.editById(classId, classData);

        setClasses((state) =>
            state.map((oneClass) =>
                oneClass._id === classId ? updatedClass : oneClass
            )
        );

        setShowEditClassById(null);
    };

    const showClassDetails = (classId) => {
        setShowClassInfoById(classId);
    };

    const closeShowClassInfo = () => {
        setShowClassInfoById(null);
    };

    const showDeleteClass = (userId) => {
        setShowDelClassById(userId);
    };

    const closeDeleteClass = () => {
        setShowDelClassById(null);
    };

    const deleteClass = async () => {
        try {
            await dataService.delItemById(showDelClassById);

            setClasses((state) =>
                state.filter((oneClass) => oneClass._id !== showDelClassById)
            );

            setShowDelClassById(null);
        } catch (err) {
            console.log("Error fetching data:", err.message);
            setIsError(true);
        }
    };

    return (
        <>
            <h1 className={styles.h1}>Classes</h1>
            <section className="card users-container">
                {showCreateClass && (
                    <CreateClass
                        onClose={closeCreateClassView}
                        onSave={createClass}
                    />
                )}

                {showEditClassById && (
                    <CreateClass
                        classId={showEditClassById}
                        onClose={closeCreateClassView}
                        onSave={createClass}
                        onEdit={editClass}
                    />
                )}

                {showClassInfoById && (
                    <UserDetails
                        userId={showClassInfoById}
                        onClose={closeShowClassInfo}
                    />
                )}

                {showDelClassById && (
                    <ShowDeleteUser
                        onDelete={deleteClass}
                        onClose={closeDeleteClass}
                    />
                )}

                {/* <Search /> */}

                <div className="table-wrapper">
                    {isLoading && <Spinner />}

                    {!isLoading && classes.length === 0 && <NotUsers />}

                    {/* <!-- No content overlap component  --> */}
                    {/* <NotSearchingResults /> */}

                    {isError && <FetchError />}

                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>Image</th> */}
                                <th>
                                    First name
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="arrow-down"
                                        className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                        ></path>
                                    </svg>
                                </th>
                                <th>
                                    Last name
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="arrow-down"
                                        className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                        ></path>
                                    </svg>
                                </th>
                                <th>
                                    Email
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="arrow-down"
                                        className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                        ></path>
                                    </svg>
                                </th>
                                <th>
                                    Phone
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="arrow-down"
                                        className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                        ></path>
                                    </svg>
                                </th>
                                <th>
                                    Created
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="arrow-down"
                                        className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                        ></path>
                                    </svg>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((oneClass) => (
                                <OneClass
                                    key={oneClass._id}
                                    onInfo={showClassDetails}
                                    onEdit={showEditClass}
                                    onDel={showDeleteClass}
                                    {...oneClass}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                <button className="btn-add btn" onClick={showCreateClassView}>
                    Add new class
                </button>

                <Pagination />
            </section>
        </>
    );
}
