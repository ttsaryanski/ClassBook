import { Routes, Route } from "react-router";

import { AuthProvider } from "./contexts/AuthContext";
import { ErrorProvider } from "./contexts/ErrorContext";

import "./App.css";

import Header from "./components/core/header/Header";
import UserList from "./components/UserList";
import Footer from "./components/core/footer/Footer";
import Contacts from "./components/contacts/Contacts";
import Home from "./components/home/Home";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Page404 from "./components/page 404/Page404";
import UnderConstruction from "./components/underConstruction/UnderConstruction";
import ErrorMsg from "./components/core/errorComponent/ErrorMsg";
import Classes from "./components/classes/Classes/Classes";
import Profile from "./components/auth/Profile/Profile";
import Clss from "./components/class/Class/Clss";
import CreateClass from "./components/classes/CreateClass/CreateClass";
import EditClass from "./components/classes/EditClass/EditClass";
import DetailsClass from "./components/classes/DetailsClass/DetailsClass";

function App() {
    return (
        <ErrorProvider>
            <AuthProvider>
                <div className="app-container">
                    <Header />

                    <ErrorMsg />

                    <main className="main">
                        <Routes>
                            <Route path="/" element={<Home />} />

                            <Route path="/classes" element={<Classes />} />

                            <Route
                                path="/classes/create"
                                element={<CreateClass />}
                            />

                            <Route
                                path="/classes/:classId/edit"
                                element={<EditClass />}
                            />

                            <Route
                                path="/classes/:classId/details"
                                element={<DetailsClass />}
                            />

                            <Route path="/class_1" element={<UserList />} />

                            <Route path="/contacts" element={<Contacts />} />

                            <Route path="/auth/login" element={<Login />} />

                            <Route path="/auth/profile" element={<Profile />} />

                            <Route path="/class/:clssId" element={<Clss />} />

                            <Route
                                path="/auth/register"
                                element={<Register />}
                            />

                            <Route
                                path="/underconstruction"
                                element={<UnderConstruction />}
                            />

                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </main>

                    <Footer />
                </div>
            </AuthProvider>
        </ErrorProvider>
    );
}

export default App;
