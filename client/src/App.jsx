import "./App.css";

import Header from "./components/Header";
import UserList from "./components/UserList";
import Footer from "./components/Footer";

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
