// IMPORT PACKAGES & DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// IMPORT PAGES
import Home from "./pages/Home";
import BookTip from "./pages/publicPages/BookTip";
import Contact from "./pages/publicPages/Contact";
import About from "./pages/publicPages/About";
import Register from "./pages/publicPages/Registration";
import Login from "./pages/publicPages/Login";
import Cart from "./pages/purchasePages/Cart";
import Checkout from "./pages/purchasePages/Checkout";
import Confirmation from "./pages/purchasePages/Confirmation";
import NotFound from "./pages/publicPages/NotFound";
import Profile from "./pages/protectedPages/Profile";
// IMPORT COMPONENTS
import Header from "./components/home/Header";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import Favourites from "./components/profile/Favourites";
// IMPORT AUTH-COMPONENT (används här för att skydda routes)
import { RequireAuth } from "./auth/RequireAuth";
// // IMPORT AUTH-HOOK
// import useAuth from "./hooks/useAuth";
// IMPORT STYLE
import "./App.css";

// FUNCTION
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setMobileMenuOpen((previous) => !previous);
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  // // useAuth hook hämtar statusen på authed från AuthContext
  // const { authed } = useAuth();
  // CONTENT TO BE RENDERED
  return (
    <Router>
      <div className="app-container">
        {/* HEADER */}
        <Header
          onMenuToggle={toggleMobileMenu}
          isMobileMenuOpen={mobileMenuOpen}
        />
        {/* NAVIGATION */}
        <Navbar isMobileMenuOpen={mobileMenuOpen} onNavigate={closeMobileMenu} />
        {/* MAIN */}
        <main className="main-container">
          {/* ROUTES  */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/tips" element={<BookTip />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            {/* Purchase flow routes */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            {/* Registration & Authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Protected route using RequireAuth wrapper component */}
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
