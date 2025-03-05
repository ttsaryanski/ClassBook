import { Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/core/header/Header";
import UserList from "./components/UserList";
import Footer from "./components/core/footer/Footer";
import Contacts from "./components/contacts/Contacts";
import Home from "./components/home/Home";
import Login from "./components/auth/Login/Login";
import Register from "./components/auth/Register/Register";
import Page404 from "./components/page 404/Page404";

function App() {
    return (
        <div className="app-container">
            <Header />

            <main className="main">
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/blog" element={<UserList />} />

                    <Route path="/auth/login" element={<Login />} />

                    <Route path="/auth/register" element={<Register />} />

                    <Route path="/contacts" element={<Contacts />} />

                    <Route path="/page404" element={<Page404 />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
