import { useState } from "react";
import { useParams, Link } from "react-router";

import { useError } from "../../../contexts/ErrorContext";

import styles from "./Clss.module.css";

export default function Classes() {
    const { clssId } = useParams();
    const { setError } = useError();

    const [clss, setClss] = useState({});

    return (
        <>
            <h1 className={styles.h1}>Classes {clssId}</h1>
            <section
                className={`${styles.card_container} card users-container`}
            >
                <div className="table-wrapper">
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
                            {/* {classes.map((clss) => (
                                <OneClass
                                    key={clss._id}
                                    onDel={showDeleteClass}
                                    isDirector={isDirector}
                                    pending={pending}
                                    {...clss}
                                />
                            ))} */}
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
