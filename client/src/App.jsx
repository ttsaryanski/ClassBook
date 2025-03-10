import { Routes, Route } from "react-router";
import { AuthProvider } from "./AutContext";

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

function App() {
    return (
        <AuthProvider>
            <div className="app-container">
                <Header />

                <main className="main">
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/class_1" element={<UserList />} />

                        <Route path="/contacts" element={<Contacts />} />

                        <Route path="/auth/login" element={<Login />} />

                        <Route path="/auth/register" element={<Register />} />

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
    );
}

export default App;
