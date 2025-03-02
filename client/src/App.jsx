import "./App.css";

import Header from "./components/core/header/Header";
import UserList from "./components/UserList";
import Footer from "./components/core/footer/Footer";

function App() {
    return (
        <>
            <Header />

            <main className="main">
                <UserList />
            </main>

            <Footer />
        </>
    );
}

export default App;
