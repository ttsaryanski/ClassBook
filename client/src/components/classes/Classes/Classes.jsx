import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { clssService } from "../../../services/clssService";

import OneClass from "../OneClass/OneClass";
import ShowDeleteClass from "../DeleteClass/DelClass";
import NotClasses from "../NotClasses";

import Spinner from "../../shared/Spinner";

import styles from "./Classes.module.css";

export default function Classes() {
    const delAbortControllerRef = useRef(null);
    const { isDirector } = useAuth();
    const { setError } = useError();

    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pending, setPending] = useState(false);

    const [showDelClassById, setShowDelClassById] = useState(null);

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

        try {
            await clssService.delById(showDelClassById, signal);
            setClasses((state) =>
                state.filter((clss) => clss._id !== showDelClassById)
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
