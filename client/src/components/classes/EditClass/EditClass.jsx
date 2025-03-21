import { useEffect, useRef, useState } from "react";
import { useNavigate, Link, useParams } from "react-router";

import { useError } from "../../../contexts/ErrorContext";

import { teacherService } from "../../../services/teacherService";
import { studentService } from "../../../services/studentService";
import { clssService } from "../../../services/clssService";

import styles from "./EditClass.module.css";

export default function EditClass() {
    const editAbortControllerRef = useRef(null);
    const navigate = useNavigate();
    const { setError } = useError();
    const { classId } = useParams();

    const [pending, setPending] = useState(false);

    const [clss, setClss] = useState({});
    const [classTitle, setClassTitle] = useState("");
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [selectedStudentsIds, setSelectedStudentsIds] = useState([]);

    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [errors, setErrors] = useState({
        title: "",
        teacher: "",
    });

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!classId) {
            return;
        }

        const fetchClss = async () => {
            try {
                const clssResult = await clssService.getById(classId, signal);
                setClss(clssResult);
                setClassTitle(clssResult.title || "");
                setSelectedTeacherId(clssResult.teacher || "");
                setSelectedStudentsIds(clssResult.students || []);
            } catch (error) {
                if (!signal.aborted) {
                    setError(
                        "Error fetching classes:",
                        error.message || "Unknown error"
                    );
                }
            }
        };

        const fetchTeachers = async () => {
            try {
                const dataTeachers = await teacherService.getAll(signal);
                setTeachers(dataTeachers);
            } catch (error) {
                if (!signal.aborted) {
                    setError("Error fetching teachers:", error.message);
                }
            }
        };

        const fetchStudents = async () => {
            try {
                const dataSudents = await studentService.getAll(signal);
                setStudents(dataSudents);
            } catch (error) {
                if (!signal.aborted) {
                    setError("Error fetching students:", error.message);
                }
            }
        };

        fetchClss();
        fetchTeachers();
        fetchStudents();

        return () => {
            abortController.abort();
        };
    }, [classId]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!selectedTeacherId) {
            setSelectedTeacher(null);
            return;
        }

        const fetchTeacher = async () => {
            try {
                const dataTeacher = await teacherService.getById(
                    selectedTeacherId,
                    signal
                );
                setSelectedTeacher(dataTeacher);
            } catch (error) {
                if (!signal.aborted) {
                    setError(
                        "Error fetching teachers:",
                        error.message || "Unknown error"
                    );
                }
            }
        };
        fetchTeacher();

        return () => {
            abortController.abort();
        };
    }, [selectedTeacherId]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!selectedStudentsIds || selectedStudentsIds.length === 0) {
            setSelectedStudents([]);
            return;
        }

        const fetchStudents = async () => {
            try {
                const studentsData = await Promise.all(
                    selectedStudentsIds.map((id) =>
                        studentService.getById(id, signal)
                    )
                );
                setSelectedStudents(studentsData);
            } catch (error) {
                if (!signal.aborted) {
                    setError(
                        "Error fetching students:",
                        error.message || "Unknown error"
                    );
                }
            }
        };
        fetchStudents();

        return () => {
            abortController.abort();
        };
    }, [selectedStudentsIds]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (editAbortControllerRef.current) {
            editAbortControllerRef.current.abort();
        }
        editAbortControllerRef.current = new AbortController();
        const signal = editAbortControllerRef.current.signal;

        const classData = {
            title: classTitle,
            teacher: selectedTeacherId,
            students: selectedStudentsIds,
        };

        setPending(true);

        try {
            setError(null);
            await clssService.editById(classId, classData, signal);
            navigate("/classes");
        } catch (error) {
            if (error.name === "AbortError") {
                setError("Request was aborted:", error.message);
            } else {
                setError(error.message || "Create class failed.");
            }
        } finally {
            setPending(false);
        }
    };

    const validateTitle = (value) => {
        if (value.length < 3) {
            return "Class title must be at least 3 characters long.";
        }
        return "";
    };

    const validateTeacher = (value) => {
        if (value === "") {
            return "You must choose a teacher.";
        }
        return "";
    };

    const titleChangeHandler = (e) => {
        const value = e.target.value;
        setClassTitle(value);
        setErrors((prev) => ({ ...prev, title: validateTitle(value) }));
    };

    const teacherChangeHandler = (e) => {
        const value = e.target.value;
        setSelectedTeacherId(value);
        setErrors((prev) => ({ ...prev, teacher: validateTeacher(value) }));
    };

    const studentChangeHandler = (e) => {
        const selectedOptions = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setSelectedStudentsIds(selectedOptions);
    };

    const isFormValid =
        !errors.title && !errors.teacher && classTitle && selectedTeacherId;

    return (
        <div className={styles.edit}>
            <div className={`${styles.modall_edit} modall`}>
                <div className={`${styles.edit_class} user-container`}>
                    <header className="headers">
                        <h2 className={styles.h2}>
                            {`Edit ${clss.title} Class`}
                        </h2>
                    </header>
                    <form onSubmit={submitHandler} className={styles.form}>
                        <div className="form-row">
                            <div className="form-group">
                                <label
                                    htmlFor="classTitle"
                                    className={styles.required}
                                >
                                    Class Title
                                </label>
                                <div className="input-wrapper">
                                    <div className="mt-2">
                                        <div className="flex">
                                            <span>
                                                <i
                                                    className={`${styles.icon} fa-solid fa-chalkboard`}
                                                ></i>
                                            </span>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={classTitle || ""}
                                                onChange={titleChangeHandler}
                                            />
                                        </div>
                                        {errors.title && (
                                            <p className="text-danger midlle mt-1">
                                                {errors.title}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label
                                    htmlFor="teacher"
                                    className={styles.required}
                                >
                                    Teachers
                                </label>
                                <div className="input-wrapper">
                                    <select
                                        id="teacher"
                                        name="teacher"
                                        value={selectedTeacherId}
                                        onChange={teacherChangeHandler}
                                    >
                                        <option value="">Select teacher</option>
                                        {teachers.map((teacher) => (
                                            <option
                                                key={teacher._id}
                                                value={teacher._id}
                                            >
                                                {teacher.firstName}{" "}
                                                {teacher.lastName} -{" "}
                                                {teacher.speciality}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.teacher && (
                                    <p className="text-danger midlle mt-1">
                                        {errors.teacher}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Selected Teachers</label>
                                <div className="input-wrapper">
                                    <div className="input-wrapper">
                                        <span>
                                            <i
                                                className={`${styles.icon} fa-solid fa-user`}
                                            ></i>
                                        </span>
                                        <input
                                            value={
                                                selectedTeacher
                                                    ? `${selectedTeacher.firstName} ${selectedTeacher.lastName} - ${selectedTeacher.speciality}`
                                                    : ""
                                            }
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="students">Students</label>
                                <div className="input-wrapper">
                                    <select
                                        id="students"
                                        name="students"
                                        multiple
                                        value={selectedStudentsIds}
                                        onChange={studentChangeHandler}
                                    >
                                        <option value="">
                                            Select students
                                        </option>
                                        {students.map((student) => (
                                            <option
                                                key={student._id}
                                                value={student._id}
                                            >
                                                {student.firstName}{" "}
                                                {student.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Selected students</label>
                                {selectedStudents.length > 0 ? (
                                    selectedStudents.map((student) => (
                                        <div
                                            key={student._id}
                                            className="input-wrapper"
                                        >
                                            <span>
                                                <i
                                                    className={`${styles.icon} fa-solid fa-user`}
                                                ></i>
                                            </span>
                                            <input
                                                value={`${student.firstName} ${student.lastName}`}
                                                readOnly
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="input-wrapper">
                                        <span>
                                            <i
                                                className={`${styles.icon} fa-solid fa-user`}
                                            ></i>
                                        </span>
                                        <input readOnly placeholder="" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div id="form-actions">
                            <button
                                id="action-save"
                                type="submit"
                                className={`${styles.edit_btn} btn ${
                                    !isFormValid || pending
                                        ? "disabled opacity-50"
                                        : ""
                                }`}
                                disabled={!isFormValid || pending}
                                style={{
                                    cursor:
                                        !isFormValid || pending
                                            ? "not-allowed"
                                            : "pointer",
                                }}
                            >
                                Edit
                            </button>
                            <Link
                                id="action-cancel"
                                className={`${styles.cancel_btn} btn`}
                                to={"/classes"}
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
