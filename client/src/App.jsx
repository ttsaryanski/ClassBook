import "./App.css";

import Header from "./components/core/header/Header";
import UserList from "./components/UserList";
import Footer from "./components/core/footer/Footer";
import Contacts from "./components/contacts/Contacts";

function App() {
    return (
        <div className="app-container">
            <Header />

            <Contacts />

            {/* <main className="main">
                <UserList />
            </main> */}

            <Footer />
        </div>
    );
}

export default App;
