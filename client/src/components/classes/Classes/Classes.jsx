import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { clssService } from "../../../services/clssService";
import { teacherService } from "../../../services/teacherService";
import { studentService } from "../../../services/studentService";

import OneClass from "../OneClass/OneClass";
import CreateClass from "../CreateClass/CreateClass";
import ShowDeleteClass from "../DeleteClass/DelClass";
import ClassDetails from "../DetailsClass/DetailsClass";
import NotClasses from "../NotClasses";

import Spinner from "../../Spinner";
import Pagination from "../../shared/Pagination";

import styles from "./Classes.module.css";

export default function Classes() {
    const creatAbortControllerRef = useRef(null);
    const editAbortControllerRef = useRef(null);
    const delAbortControllerRef = useRef(null);
    const { isDirector } = useAuth();
    const { setError } = useError();

    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pending, setPending] = useState(false);

    const [showClassInfoById, setShowClassInfoById] = useState(null);
    const [showDelClassById, setShowDelClassById] = useState(null);
    const [showEditClassById, setShowEditClassById] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchData = async () => {
            try {
                const result = await clssService.getAll(signal);
                setClasses(result);
                setIsLoading(false);
            } catch (err) {
                if (!signal.aborted) {
                    setError("Error fetching teachers:", err.message);
                }
            }
        };

        fetchData();

        return () => {
            abortController.abort();
        };
    }, []);

    const showEditClass = (classId) => {
        setShowEditClassById(classId);
    };

    const editClass = async (classData) => {
        if (pending) {
            return;
        }

        if (editAbortControllerRef.current) {
            editAbortControllerRef.current.abort();
        }

        editAbortControllerRef.current = new AbortController();
        const signal = editAbortControllerRef.current.signal;

        setPending(true);

        try {
            const classId = showEditClassById;
            const updatedClass = await clssService.editById(
                classId,
                classData,
                signal
            );
            setClasses((state) =>
                state.map((oneClass) =>
                    oneClass._id === classId ? updatedClass : oneClass
                )
            );
            setShowEditClassById(null);
        } catch (err) {
            if (err.name === "AbortError") {
                setError("Request was aborted:", err.message);
            } else {
                setError("Error editing data:", err.message);
            }
        } finally {
            setPending(false);
        }

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
        if (pending) {
            return;
        }

        if (delAbortControllerRef.current) {
            delAbortControllerRef.current.abort();
        }

        delAbortControllerRef.current = new AbortController();
        const signal = delAbortControllerRef.current.signal;

        setPending(true);

        try {
            await clssService.delById(showDelClassById, signal);
            setClasses((state) =>
                state.filter((oneClass) => oneClass._id !== showDelClassById)
            );

            setShowDelClassById(null);
        } catch (err) {
            if (err.name === "AbortError") {
                setError("Request was aborted:", err.message);
            } else {
                setError("Error fetching data:", err.message);
            }
        } finally {
            setPending(false);
        }
    };

    return (
        <>
            <h1 className={styles.h1}>Classes</h1>
            <section
                className={`${styles.card_container} card users-container`}
            >
                {showEditClassById && (
                    <CreateClass
                        classId={showEditClassById}
                        onClose={closeCreateClassView}
                        onSave={createClass}
                        onEdit={editClass}
                        teachers={teachers}
                        students={students}
                    />
                )}

                {showClassInfoById && (
                    <ClassDetails
                        classId={showClassInfoById}
                        onClose={closeShowClassInfo}
                    />
                )}

                {showDelClassById && (
                    <ShowDeleteClass
                        classId={showDelClassById}
                        onDelete={deleteClass}
                        onClose={closeDeleteClass}
                    />
                )}

                {/* <Search /> */}

                <div className="table-wrapper">
                    {isLoading && <Spinner />}

                    {!isLoading && classes.length === 0 && <NotClasses />}

                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>Image</th> */}
                                <th>Class Title</th>
                                <th>Class Teacher</th>
                                <th>Class Students</th>
                                {isDirector && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((clss) => (
                                <OneClass
                                    key={clss._id}
                                    onInfo={showClassDetails}
                                    onEdit={showEditClass}
                                    onDel={showDeleteClass}
                                    isDirector={isDirector}
                                    pending={pending}
                                    {...clss}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {isDirector && (
                    <Link className="btn-add btn" to={"/classes/create"}>
                        Add new class
                    </Link>
                )}

                {/* <Pagination /> */}
            </section>
        </>
    );
}
