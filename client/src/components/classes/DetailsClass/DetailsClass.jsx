import { useEffect, useState } from "react";

import { clssService } from "../../../services/clssService";
import { teacherService } from "../../../services/teacherService";
import { studentService } from "../../../services/studentService";

import { fromIsoToString } from "../../../utils/setDateString";

export default function ClassDetails({ classId, onClose }) {
    const [clss, setClss] = useState({});

    const [teacher, setTeacher] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await clssService.getById(classId);
                setClss(result);

                if (result.teacher) {
                    const teacherData = await teacherService.getById(
                        result.teacher
                    );
                    setTeacher(teacherData);
                }

                if (result.students && result.students.length > 0) {
                    const studentsData = await Promise.all(
                        result.students.map((studentId) =>
                            studentService.getById(studentId)
                        )
                    );
                    setStudents(studentsData);
                }
            } catch (err) {
                console.log("Error fetching data:", err.message);
            }
        };

        fetchData();
    }, [classId]);

    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose}></div>
            <div className="modall">
                <div className="detail-container">
                    <header className="headers">
                        <h2>{`Class ${clss.title} Detail`}</h2>
                    </header>
                    <div className="content">
                        <div className="user-details">
                            <dir>
                                Class Id: <strong>{clss._id}</strong>
                            </dir>
                            <dir>Class name: {clss.title}</dir>
                            <dir>
                                Class teacher:{" "}
                                {teacher
                                    ? `${teacher.firstName} ${teacher.lastName}`
                                    : "Зареждане..."}
                            </dir>
                            <dir>
                                Students:{" "}
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
                                    <dir>Няма избрани ученици</dir>
                                )}
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
