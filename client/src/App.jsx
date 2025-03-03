import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/core/header/Header";
import UserList from "./components/UserList";
import Footer from "./components/core/footer/Footer";
import Contacts from "./components/contacts/Contacts";
import Home from "./components/Home/Home";
import Login from "./components/auth/Login/Login";

function App() {
    return (
        <div className="app-container">
            <Header />

            <main className="main">
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/blog" element={<UserList />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/contacts" element={<Contacts />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
