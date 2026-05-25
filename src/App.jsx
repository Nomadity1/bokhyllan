// IMPORT OF PACKAGES & DEPENDENCIES
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// IMPORT OF PAGES
import Home from "./pages/Home";
import Register from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
// IMPORT OF COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import Favourites from "./components/profile/Favourites";
// IMPORT OF AUTH-COMPONENT (används här för att skydda routes)
import { RequireAuth } from "./auth/RequireAuth";
// IMPORT OF AUTH-HOOK
import useAuth from "./hooks/useAuth";
// IMPORT OF STYLES
import "./App.css";

// FUNCTIONS & PARAMETERS
function App() {
  // useAuth hook hämtar statusen på authed från AuthContext
  const { authed } = useAuth();

  // CONTENT TO BE RENDERED
  return (
    <Router>
      {/* HEADER */}
      <Header />
      <div className="app-container">
        {/* NAVIGATION LINKS*/}
        <nav className="nav-container">
          {/* Public links (always visible) */}
          {/* <Link to="/">Home</Link> */}
          {/* Behövs Home-länk? Home är ju redan på "/" */}
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          {/* Protected links (visible only if authed is true) */}
          {authed && <Link to="/profile">Profile</Link>}
          {authed && <Link to="/profile/favourites">Favourites</Link>}
        </nav>
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
            {/* End with this route if nothing else matches */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
// EXPORTS
export default App;
