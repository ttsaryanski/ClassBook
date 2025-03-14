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

                            <Route path="/class_1" element={<UserList />} />

                            <Route path="/contacts" element={<Contacts />} />

                            <Route path="/auth/login" element={<Login />} />

                            <Route path="/auth/profile" element={<Profile />} />

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
