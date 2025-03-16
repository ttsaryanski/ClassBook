import { useEffect, useState } from "react";

import { clssService } from "../../../services/clssService";
import { dataService } from "../../../services/dataService";
import { teacherService } from "../../../services/teacherService";
import { studentService } from "../../../services/studentService";

import OneClass from "../OneClass/OneClass";
import CreateClass from "../CreateClass/CreateClass";
import Pagination from "../../shared/Pagination";

import Search from "../../Search";
import Spinner from "../../Spinner";
import NotSearchingResults from "../../NotSearchingResult";
import FetchError from "../../FetchError";
import UserDetails from "../../UserDetails";
import ShowDeleteUser from "../../UserDelete";
import NotClasses from "../NotClasses";

import styles from "./Classes.module.css";

export default function Classes() {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [showCreateClass, setShowCreateClass] = useState(false);
    const [showClassInfoById, setShowClassInfoById] = useState(null);
    const [showDelClassById, setShowDelClassById] = useState(null);
    const [showEditClassById, setShowEditClassById] = useState(null);

    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const dataTeachers = await teacherService.getAll();
                setTeachers(dataTeachers);
            } catch (err) {
                console.log("Error fetching data:", err.message);
            }
        };
        fetchTeachers();

        const fetchStudents = async () => {
            try {
                const dataSudents = await studentService.getAll();
                setStudents(dataSudents);
            } catch (err) {
                console.log("Error fetching data:", err.message);
            }
        };
        fetchStudents();
        const fetchData = async () => {
            try {
                const result = await clssService.getAll();

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

    const createClass = async (classData) => {
        try {
            const newClass = await clssService.createNew(classData);
            setClasses((state) => [...state, newClass]);
            setShowCreateClass(false);
        } catch (err) {
            console.log("Грешка при създаване на клас:", err.message);
            setIsError(true);
        }

        setShowCreateClass(false);
    };

    const showEditClass = (classId) => {
        setShowEditClassById(classId);
    };

    const editClass = async (classData) => {
        //e.preventDefault();
        console.log(classData);

        // const classId = showEditClassById;
        // const formData = new FormData(e.target.parentElement.parentElement);
        // const classData = Object.fromEntries(formData);

        // const updatedClass = await dataService.editById(classId, classData);

        // setClasses((state) =>
        //     state.map((oneClass) =>
        //         oneClass._id === classId ? updatedClass : oneClass
        //     )
        // );

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
                        teachers={teachers}
                        students={students}
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

                    {!isLoading && classes.length === 0 && <NotClasses />}

                    {/* <!-- No content overlap component  --> */}
                    {/* <NotSearchingResults /> */}

                    {isError && <FetchError />}

                    <table className="table">
                        <thead>
                            <tr>
                                {/* <th>Image</th> */}
                                <th>Class Title</th>
                                <th>Class Teacher</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((clss) => (
                                <OneClass
                                    key={clss._id}
                                    onInfo={showClassDetails}
                                    onEdit={showEditClass}
                                    onDel={showDeleteClass}
                                    {...clss}
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
