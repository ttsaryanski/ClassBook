import { useEffect, useState } from "react";

import { dataService } from "../../../services/dataService";
import { teacherService } from "../../../services/teacherService";
import { studentService } from "../../../services/studentService";
import { clssService } from "../../../services/clssService";

export default function CreateClass({
    classId,
    onClose,
    onSave,
    onEdit,
    teachers,
    students,
}) {
    const [clss, setClss] = useState({});
    const [classTitle, setClassTitle] = useState("");

    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState("");
    const [selectedStudentsIds, setSelectedStudentsIds] = useState([]);

    const [clssTeacher, setClssTeacher] = useState({});
    const [clssTeacherId, setClssTeacherId] = useState("");

    useEffect(() => {
        if (!classId) {
            return;
        }

        const fetchClss = async () => {
            try {
                const clssResult = await clssService.getById(classId);
                setClss(clssResult);
                setClassTitle(clssResult.title || "");
                setSelectedTeacherId(clssResult.teacher || "");
                setSelectedStudentsIds(clssResult.students || []);
            } catch (err) {
                console.log("Error fetching data:", err.message);
            }
        };
        fetchClss();
    }, [classId]);

    useEffect(() => {
        if (!selectedTeacherId) {
            return;
        }

        const fetchTeacher = async () => {
            try {
                const dataTeacher = await teacherService.getById(
                    selectedTeacherId
                );
                setSelectedTeacher(dataTeacher);
            } catch (err) {
                console.log("Error fetching data:", err.message);
            }
        };
        fetchTeacher();
    }, [selectedTeacherId]);

    useEffect(() => {
        if (!selectedStudentsIds || selectedStudentsIds.length === 0) {
            setSelectedStudents([]);
            return;
        }

        const fetchStudents = async () => {
            try {
                const studentsData = await Promise.all(
                    selectedStudentsIds.map((id) => studentService.getById(id))
                );
                setSelectedStudents(studentsData);
            } catch (err) {
                console.log("Грешка при извличане на ученици:", err.message);
            }
        };
        fetchStudents();
    }, [selectedStudentsIds]);

    const submitHandler = (e) => {
        e.preventDefault();

        const classData = {
            title: classTitle,
            teacher: selectedTeacherId,
            students: selectedStudentsIds,
        };
        if (classId) {
            onEdit(classData);
        } else {
            onSave(classData);
        }
    };

    const titleChangeHandler = (e) => {
        const value = e.target.value;
        setClassTitle(value);
    };

    const teacherChangeHandler = (e) => {
        const value = e.target.value;
        setSelectedTeacherId(value);
    };

    const studentChangeHandler = (e) => {
        const selectedOptions = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setSelectedStudentsIds(selectedOptions);
    };

    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose}></div>
            <div className="modall">
                <div className="user-container">
                    <header className="headers">
                        <h2>{classId ? "Edit" : "Add"} Class</h2>
                    </header>
                    <form onSubmit={submitHandler}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="classTitle">Class Title</label>
                                <div className="input-wrapper">
                                    <span>
                                        <i className="fa-solid fa-chalkboard"></i>
                                    </span>
                                    {classId ? (
                                        <input
                                            defaultValue={clss.title}
                                            readOnly
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={classTitle || ""}
                                            placeholder="History"
                                            onChange={titleChangeHandler}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {classId ? (
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Teacher</label>
                                    <div className="input-wrapper">
                                        <div className="input-wrapper">
                                            <span>
                                                <i className="fa-solid fa-user"></i>
                                            </span>
                                            <input
                                                value={
                                                    selectedTeacher
                                                        ? `${selectedTeacher.firstName} ${selectedTeacher.lastName}`
                                                        : ""
                                                }
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="teacher">Teachers</label>
                                    <div className="input-wrapper">
                                        <select
                                            id="teacher"
                                            name="teacher"
                                            value={selectedTeacherId}
                                            onChange={teacherChangeHandler}
                                        >
                                            <option value="">
                                                Select seacher
                                            </option>
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
                                </div>

                                <div className="form-group">
                                    <label>Selected Teachers</label>
                                    <div className="input-wrapper">
                                        <div className="input-wrapper">
                                            <span>
                                                <i className="fa-solid fa-user"></i>
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
                        )}

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
                                                <i className="fa-solid fa-user"></i>
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
                                            <i className="fa-solid fa-user"></i>
                                        </span>
                                        <input readOnly placeholder="" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div id="form-actions">
                            {classId ? (
                                <button
                                    id="action-save"
                                    className="btn"
                                    type="submit"
                                >
                                    Edit
                                </button>
                            ) : (
                                <button
                                    id="action-save"
                                    className="btn"
                                    type="submit"
                                >
                                    Save
                                </button>
                            )}
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
