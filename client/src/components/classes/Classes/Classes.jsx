import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";
import { useClass } from "../../../contexts/ClassContext";

import { clssService } from "../../../services/clssService";

import OneClass from "../OneClass/OneClass";
import ShowDeleteClass from "../DeleteClass/DelClass";
import NotClasses from "../NotClasses";

import Spinner from "../../shared/Spinner/Spinner";

import styles from "./Classes.module.css";

export default function Classes() {
    const delAbortControllerRef = useRef(null);
    const { isDirector } = useAuth();
    const { setError } = useError();
    const { refreshClasses } = useClass();

    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pending, setPending] = useState(false);

    const [showDelClassById, setShowDelClassById] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchClasses = async () => {
            try {
                const result = await clssService.getAll(signal);
                setClasses(result);
                setIsLoading(false);
            } catch (error) {
                if (!signal.aborted) {
                    setError("Error fetching classes.", error.message);
                }
            }
        };

        fetchClasses();

        return () => {
            abortController.abort();
        };
    }, [setError]);

    const showDeleteClass = (clssId) => {
        setShowDelClassById(clssId);
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

        setError(null);
        try {
            await clssService.delById(showDelClassById, signal);
            setClasses((state) =>
                state.filter((clss) => clss._id !== showDelClassById)
            );

            refreshClasses();
            setShowDelClassById(null);
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Request was aborted:", error.message);
            } else {
                setError("Error deleting class.", error.message);
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
                {showDelClassById && (
                    <ShowDeleteClass
                        classId={showDelClassById}
                        onDelete={deleteClass}
                        onClose={closeDeleteClass}
                    />
                )}

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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((clss) => (
                                <OneClass
                                    key={clss._id}
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
                    <Link
                        className={`${styles.add_btn} btn-add btn`}
                        to={"/classes/create"}
                    >
                        Add new class
                    </Link>
                )}
            </section>
        </>
    );
}
