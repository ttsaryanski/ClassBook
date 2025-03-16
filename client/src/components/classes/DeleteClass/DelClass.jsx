import { useEffect, useState } from "react";

import { clssService } from "../../../services/clssService";

export default function ShowDeleteClass({ classId, onDelete, onClose }) {
    const [clss, setClss] = useState({});

    useEffect(() => {
        if (!classId) {
            return;
        }

        const fetchClss = async () => {
            try {
                const clssResult = await clssService.getById(classId);
                setClss(clssResult);
            } catch (err) {
                console.log("Error fetching data:", err.message);
            }
        };
        fetchClss();
    }, [classId]);

    return (
        <div className="overlay">
            <div className="backdrop" onClick={onClose}></div>
            <div className="modall">
                <div className="confirm-container">
                    <header className="headers">
                        <h2>
                            {`Are you sure you want to delete ${clss.title} class?`}
                        </h2>
                    </header>
                    <div className="actions">
                        <div id="form-actions">
                            <button
                                id="action-save"
                                className="btn"
                                type="submit"
                                onClick={onDelete}
                            >
                                Delete
                            </button>
                            <button
                                id="action-cancel"
                                className="btn"
                                type="button"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
