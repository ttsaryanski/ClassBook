import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

import { useError } from "../../../contexts/ErrorContext";

import { clssService } from "../../../services/clssService";

import Spinner from "../../shared/Spinner/Spinner";

import styles from "./Clss.module.css";
import NotStudents from "../NotStudents";
import Student from "../../students/Student/Student";

export default function Clss() {
    const { clssId } = useParams();
    const { setError } = useError();

    const [clss, setClss] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [teacher, setTeacher] = useState({});
    const [students, setStudents] = useState([]);
    const [isDirector, setIsDirector] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        setError(null);
        const fetchClass = async () => {
            try {
                const clss = await clssService.getByIdPopulate(clssId, signal);
                setClss(clss);
                setTeacher(clss.teacher);
                setStudents(clss.students);
                setIsLoading(false);
            } catch (error) {
                if (!signal.aborted) {
                    setError("Error fetching classes.", error.message);
                }
            }
        };
        fetchClass();

        return () => {
            abortController.abort();
        };
    }, [clssId, setError]);

    return (
        <>
            {isLoading && <Spinner />}
            <h1 className={styles.h1}>Class {clss.title}</h1>
            <h3 className={styles.h1}>
                Teacher: {teacher.firstName} {teacher.lastName}
            </h3>
            <section
                className={`${styles.card_container} card users-container`}
            >
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>Image</th> */}
                                <th>Student first name</th>
                                <th>Student last name</th>
                                <th>Grades</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tbody}>
                            {!isLoading && students.length === 0 && (
                                <NotStudents />
                            )}

                            {students.map((student) => (
                                <Student
                                    key={student._id}
                                    // onDel={showDeleteClass}
                                    isDirector={isDirector}
                                    // pending={pending}
                                    student={student}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* {isDirector && (
                    <>
                        <Link
                            className={`${styles.add_btn} btn-add btn`}
                            to={"/classes/create"}
                        >
                            Add new class
                        </Link>

                        <Link
                            className={`${styles.add_btn} btn-add btn`}
                            to={"/students/create"}
                        >
                            Add new student
                        </Link>
                    </>
                )} */}
            </section>
        </>
    );
}
