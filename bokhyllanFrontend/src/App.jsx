// IMPORT PACKAGES & DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// IMPORT PAGES
import Home from "./pages/Home";
import Register from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
// IMPORT COMPONENTS
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Favourites from "./components/profile/Favourites";
// IMPORT AUTH-COMPONENT (används här för att skydda routes)
import { RequireAuth } from "./auth/RequireAuth";
// // IMPORT AUTH-HOOK
// import useAuth from "./hooks/useAuth";
// IMPORT STYLE
import "./App.css";
// DEFINE FUNCTIONS & PARAMETERS
function App() {
  // // useAuth hook hämtar statusen på authed från AuthContext
  // const { authed } = useAuth();
  // CONTENT TO BE RENDERED
  return (
    <Router>
      <div className="app-container">
        {/* HEADER */}
        <Header />
        {/* NAVIGATION */}
        <Navbar />
        {/* MAIN */}
        <main className="main-container">
          {/* ROUTES  */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected routes using RequireAuth wrapper component */}
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/profile/favourites"
              element={
                <RequireAuth>
                  <Favourites />
                </RequireAuth>
              }
            />
            {/* End Fall-back route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* FOOTER */}
        <Footer />
      </div>
      {/* End of app-container */}
    </Router>
  );
}
// EXPORTS
export default App;
