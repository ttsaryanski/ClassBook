import { useEffect, useState } from "react";

import { useError } from "../../../contexts/ErrorContext";

import { clssService } from "../../../services/clssService";
import { teacherService } from "../../../services/teacherService";
import { studentService } from "../../../services/studentService";

import { fromIsoToString } from "../../../utils/setDateString";

import styles from "./DetailsClass.module.css";

export default function ClassDetails({ classId, onClose }) {
    const { setError } = useError();

    const [clss, setClss] = useState({});

    const [teacher, setTeacher] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        let isMounted = true;

        const fetchClss = async () => {
            try {
                const result = await clssService.getById(classId, signal);
                if (isMounted) {
                    setClss(result);
                }

                if (result.teacher) {
                    const teacherData = await teacherService.getById(
                        result.teacher,
                        signal
                    );
                    if (isMounted) {
                        setTeacher(teacherData);
                    }
                } else if (isMounted) {
                    setTeacher(null);
                }

                if (result.students && result.students.length > 0) {
                    const studentsData = await Promise.all(
                        result.students.map((studentId) =>
                            studentService.getById(studentId, signal)
                        )
                    );
                    if (isMounted) {
                        setStudents(studentsData);
                    }
                } else if (isMounted) {
                    setStudents([]);
                }
            } catch (err) {
                if (!signal.aborted) {
                    setError(
                        "Error fetching class:",
                        err.message || "Unknown error"
                    );
                    onClose();
                }
            }
        };

        fetchClss();

        return () => {
            isMounted = false;
            abortController.abort();
        };
    }, [classId]);

    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose}></div>
            <div className="modall">
                <div className={`${styles.details} detail-container`}>
                    <header className="headers">
                        <h2>{`Class ${clss.title} Detail`}</h2>
                    </header>
                    <div className="content">
                        <div className={`${styles.user_details} user-details`}>
                            {/* <dir>
                                Class Id: <strong>{clss._id}</strong>
                            </dir> */}
                            <dir>
                                Class name: <strong>{clss.title}</strong>
                            </dir>
                            <dir>
                                Class teacher:{" "}
                                <strong>
                                    {teacher
                                        ? `${teacher.firstName} ${teacher.lastName}`
                                        : "Зареждане..."}
                                </strong>
                            </dir>
                            <dir className={styles.students}>
                                <span>Students: </span>
                                <strong>
                                    {students.length > 0 ? (
                                        <ul>
                                            {students.map((student) => (
                                                <li key={student._id}>
                                                    {student.firstName}{" "}
                                                    {student.lastName}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <dir>В този клас няма ученици</dir>
                                    )}
                                </strong>
                            </dir>

                            <dir>
                                Created on:{" "}
                                <strong>
                                    {fromIsoToString(clss.createdAt)}
                                </strong>
                            </dir>

                            <dir>
                                Modified on:{" "}
                                <strong>
                                    {fromIsoToString(clss.updatedAt)}
                                </strong>
                            </dir>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
