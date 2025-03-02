import { useEffect, useState } from "react";

import { dataService } from "../services/dataService";

import Pagination from "./Pagination";
import Search from "./Search";
import UserItem from "./UserItem";
import Spinner from "./Spinner";
import NotUsers from "./NotUsers";
import NotSearchingResults from "./NotSearchingResult";
import FetchError from "./FetchError";
import CreateView from "./CreateView";
import UserDetails from "./UserDetails";
import ShowDeleteUser from "./UserDelete";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showInfoById, setShowInfoById] = useState(null);
    const [showDelById, setShowDelById] = useState(null);
    const [showEditById, setShowEditById] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dataService.getAll();

                setUsers(result);
                setIsLoading(false);
            } catch (err) {
                console.log("Error fetching data:", err.message);
                setIsError(true);
            }
        };

        fetchData();
    }, []);

    const showCreateView = () => {
        setShowCreate(true);
    };

    const closeCreateView = () => {
        setShowCreate(false);
        setShowEditById(null);
    };

    const createUser = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target.parentElement.parentElement);
        const userData = Object.fromEntries(formData);

        const newUser = await dataService.createNew(userData);
        setUsers((state) => [...state, newUser]);

        setShowCreate(false);
    };

    const showEdit = (userId) => {
        setShowEditById(userId);
    };

    const editUser = async (e) => {
        e.preventDefault();

        const userId = showEditById;
        const formData = new FormData(e.target.parentElement.parentElement);
        const userData = Object.fromEntries(formData);

        const updatedUser = await dataService.editById(userId, userData);

        setUsers((state) =>
            state.map((user) => (user._id === userId ? updatedUser : user))
        );

        setShowEditById(null);
    };

    const showDetails = (userId) => {
        setShowInfoById(userId);
    };

    const closeShowInfo = () => {
        setShowInfoById(null);
    };

    const showDelete = (userId) => {
        setShowDelById(userId);
    };

    const closeDelete = () => {
        setShowDelById(null);
    };

    const deleteUser = async () => {
        try {
            await dataService.delItemById(showDelById);

            setUsers((state) =>
                state.filter((user) => user._id !== showDelById)
            );

            setShowDelById(null);
        } catch (err) {
            console.log("Error fetching data:", err.message);
            setIsError(true);
        }
    };

    return (
        <section className="card users-container">
            {showCreate && (
                <CreateView onClose={closeCreateView} onSave={createUser} />
            )}

            {showEditById && (
                <CreateView
                    userId={showEditById}
                    onClose={closeCreateView}
                    onSave={createUser}
                    onEdit={editUser}
                />
            )}

            {showInfoById && (
                <UserDetails userId={showInfoById} onClose={closeShowInfo} />
            )}

            {showDelById && (
                <ShowDeleteUser onDelete={deleteUser} onClose={closeDelete} />
            )}

            <Search />

            <div className="table-wrapper">
                {isLoading && <Spinner />}

                {!isLoading && users.length === 0 && <NotUsers />}

                {/* <!-- No content overlap component  --> */}
                {/* <NotSearchingResults /> */}

                {isError && <FetchError />}

                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>
                                First name
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>
                                Last name
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>
                                Email
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>
                                Phone
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>
                                Created
                                <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <UserItem
                                key={user._id}
                                onInfo={showDetails}
                                onEdit={showEdit}
                                onDel={showDelete}
                                {...user}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="btn-add btn" onClick={showCreateView}>
                Add new user
            </button>

            <Pagination />
        </section>
    );
}
