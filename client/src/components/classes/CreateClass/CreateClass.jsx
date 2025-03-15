import { useEffect, useState } from "react";
import { dataService } from "../../../services/dataService";
import { teacherService } from "../../../services/teacherService";
import { studentService } from "../../../services/studentService";

export default function CreateClass({
    classId,
    onClose,
    onSave,
    onEdit,
    teachers,
    students,
}) {
    const [clss, setClss] = useState({});
    const [classTitle, setClassTitle] = useState(clss ? clss.title : "");
    // const [teachers, setTeachers] = useState([]);
    // const [students, setStudents] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(
        clss ? clss.teacher : ""
    );
    const [selectedStudents, setSelectedStudents] = useState(
        clss ? clss.students : []
    );

    useEffect(() => {
        if (!classId) {
            return;
        }

        // const fetchTeachers = async () => {
        //     try {
        //         const dataTeachers = await teacherService.getAll();
        //         setTeachers(dataTeachers);
        //     } catch (err) {
        //         console.log("Error fetching data:", err.message);
        //     }
        // };
        // fetchTeachers();

        // const fetchStudents = async () => {
        //     try {
        //         const dataSudents = await studentService.getAll();
        //         setStudents(dataSudents);
        //     } catch (err) {
        //         console.log("Error fetching data:", err.message);
        //     }
        // };
        // fetchStudents();

        const fetchClss = async () => {
            try {
                const result = await dataService.getById(classId);
                setClss(result);
            } catch (err) {
                console.log("Error fetching data:", err.message);
            }
        };
        fetchClss();
    }, [classId]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(classTitle, selectedTeacher, selectedStudents);
    };

    const titleChangeHandler = (e) => {
        const value = e.target.value;
        setClassTitle(value);
    };

    const teacherChangeHandler = (e) => {
        const value = e.target.value;
        setSelectedTeacher(value);
    };

    const studentChangeHandler = (e) => {
        const value = e.target.value;
        setSelectedStudents(value);
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
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={classTitle}
                                        placeholder="History"
                                        onChange={titleChangeHandler}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Dropdown за учители */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="teacher">Teachers</label>
                                <div className="input-wrapper">
                                    <select
                                        id="teacher"
                                        name="teacher"
                                        value={selectedTeacher}
                                        onChange={teacherChangeHandler}
                                    >
                                        <option value="">Select seacher</option>
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
                        </div>

                        {/* Dropdown за ученици */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="students">Students</label>
                                <div className="input-wrapper">
                                    <select
                                        id="students"
                                        name="students"
                                        value={selectedStudents}
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
                        </div>

                        <div id="form-actions">
                            {classId ? (
                                <button
                                    id="action-save"
                                    className="btn"
                                    type="submit"
                                    onClick={onEdit}
                                >
                                    Edit
                                </button>
                            ) : (
                                <button
                                    id="action-save"
                                    className="btn"
                                    type="submit"
                                    onClick={onSave}
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
