import { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLoginDropdown, setShowLoginDropdown] = useState(false);
    const [showSignupDropdown, setShowSignupDropdown] = useState(false);
    const [hovered, setHovered] = useState(null); // Track hover state
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Track if user is logged in
    const [isAdmin, setIsAdmin] = useState(false); // Track if user is admin

    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role"); // Get user role (admin or user)
    const firstLetter = email ? email.charAt(0).toUpperCase() : "P";

    // Check if the user is logged in when the component mounts
    useEffect(() => {
        if (email) {
            setIsUserLoggedIn(true); // User is logged in
        } else {
            setIsUserLoggedIn(false); // User is not logged in
        }

        if (role === "admin") {
            setIsAdmin(true); // User is an admin
        } else {
            setIsAdmin(false); // User is not an admin
        }
    }, [email, role]);

    const loginUser = () => {
        setShowLoginDropdown(!showLoginDropdown); // Toggle login dropdown
    };

    const signupUser = () => {
        setShowSignupDropdown(!showSignupDropdown); // Toggle signup dropdown
    };

    const logoutUser = () => {
        localStorage.removeItem("email"); // Clear email from localStorage
        localStorage.removeItem("role"); // Clear role from localStorage
        logout(); // Update auth context
        setShowDropdown(false);
        setIsUserLoggedIn(false); // Set the state to logged out
        setIsAdmin(false); // Set the state to not admin
        navigate("/home"); // Navigate to the home page after logout
    };

    const toggleDropdown = () => {
        navigate("/dashboard");
    };

    const navigateToFindTurf = () => {
        navigate("/locationandsports"); // Navigate to the LocationAndSports page
    };

    const navigateToAddTurf = () => {
        navigate("/turfregister"); // Navigate to the AddTurf page
    };

    const navigateToUpdateTurf = () => {
        navigate("/updateturf"); // Navigate to the UpdateTurf page
    };
    const navigateToBookingDetails = () => {
        navigate("/bookingdetails");
    };
    const handleHover = (index) => setHovered(index);
    const handleLeave = () => setHovered(null);

    const styles = {
        navbar: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 20px",
            backgroundColor: "rgba(0,0,0,0.8)",
            flexWrap: "wrap",
            color: "rgb(0,188,212)",
            height: "45px",
        },
        logo: {
            fontSize: "25px",
            fontWeight: "bold",
        },
        ul: {
            listStyle: "none",
            display: "flex",
            margin: 0,
            padding: 0,
            flexWrap: "wrap",
            justifyContent: "flex-end",
            fontSize: "20px",
        },
        li: {
            margin: "0 20px",
        },
        a: (isHovered) => ({
            color: isHovered ? "rgb(0,188,212)" : "#fff", // Hover effect
            textDecoration: "none",
            cursor: "pointer",
            transition: "color 0.3s",
            display: "inline-block", // Ensures padding/margin takes effect
            paddingTop: "4px", // Add space to lower the text slightly
            lineHeight: "1.5", // Adjust line height for vertical alignment
        }),
        profilePic: {
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            backgroundColor: "#00bcd4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            cursor: "pointer",
            position: "relative",
        },
        dropdown: {
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.8)",
            borderRadius: "5px",
            top: "50px",
            right: "0px",
            padding: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            visibility: showDropdown ? "visible" : "hidden", // Use visibility instead of display
            opacity: showDropdown ? "1" : "0", // Optional: add a fade effect
            transition: "opacity 0.3s ease", // Smooth transition for dropdown visibility
            minWidth: "160px",
            zIndex: 1000, // Ensure dropdown is above other content
        },
        loginDropdown: {
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.8)",
            borderRadius: "5px",
            top: "50px",
            right: "0px",
            padding: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            visibility: showLoginDropdown ? "visible" : "hidden", // Use visibility
            opacity: showLoginDropdown ? "1" : "0", // Optional: add a fade effect
            transition: "opacity 0.3s ease", // Smooth transition for dropdown visibility
            minWidth: "160px",
            zIndex: 1000, // Ensure dropdown is above other content
        },
        signupDropdown: {
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.8)",
            borderRadius: "5px",
            top: "50px",
            right: "0px",
            padding: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            visibility: showSignupDropdown ? "visible" : "hidden", // Use visibility
            opacity: showSignupDropdown ? "1" : "0", // Optional: add a fade effect
            transition: "opacity 0.3s ease", // Smooth transition for dropdown visibility
            minWidth: "160px",
            zIndex: 1000, // Ensure dropdown is above other content
        },
        dropdownItem: (isHovered) => ({
            padding: "10px",
            cursor: "pointer",
            color: "#fff",
            textDecoration: "none",
            display: "block",
            borderRadius: "4px",
            marginBottom: "8px",
            transition: "background-color 0.3s",
            backgroundColor: isHovered ? "rgb(0,188,212)" : "transparent", // Hover effect
        }),
    };

    return (
        <div style={styles.navbar}>
            <div style={styles.logo}>TurfBooking System</div>
            <ul style={styles.ul}>
                <li style={styles.li}>
                    <a
                        href="/home"
                        style={styles.a(hovered === 0)}
                        onMouseEnter={() => handleHover(0)}
                        onMouseLeave={handleLeave}
                    >
                        Home
                    </a>
                </li>
                <li style={styles.li}>
                    <a
                        href="#about"
                        style={styles.a(hovered === 1)}
                        onMouseEnter={() => handleHover(1)}
                        onMouseLeave={handleLeave}
                    >
                        About Us
                    </a>
                </li>
                {isUserLoggedIn && !isAdmin && (
                    <li style={styles.li}>
                        <a
                            onClick={navigateToFindTurf}
                            style={styles.a(hovered === 2)}
                            onMouseEnter={() => handleHover(2)}
                            onMouseLeave={handleLeave}
                        >
                            Find Turf
                        </a>
                    </li>
                )}
                {isAdmin && (
                    <>
                        <li style={styles.li}>
                            <a
                                onClick={() => setShowDropdown(!showDropdown)}
                                style={styles.a(hovered === 2)}
                                onMouseEnter={() => handleHover(2)}
                                onMouseLeave={handleLeave}
                            >
                                Menu
                            </a>
                            {showDropdown && (
                                <div style={styles.dropdown}>
                                    <a
                                        onClick={navigateToAddTurf}
                                        style={styles.dropdownItem(hovered === 3)}
                                        onMouseEnter={() => handleHover(3)}
                                        onMouseLeave={handleLeave}
                                    >
                                        Add Turf
                                    </a>
                                    <a
                                        onClick={navigateToUpdateTurf}
                                        style={styles.dropdownItem(hovered === 4)}
                                        onMouseEnter={() => handleHover(4)}
                                        onMouseLeave={handleLeave}
                                    >
                                        Update Turf
                                    </a>
                                    <a
                                        onClick={navigateToBookingDetails}
                                        style={styles.dropdownItem(hovered === 5)}
                                        onMouseEnter={() => handleHover(5)}
                                        onMouseLeave={handleLeave}
                                    >
                                        Booking Details
                                    </a>
                                </div>
                            )}
                        </li>
                    </>
                )}

                {!isUserLoggedIn ? (
                    <>
                        <li style={styles.li}>
                            <a
                                onClick={loginUser}
                                style={styles.a(hovered === 4)}
                                onMouseEnter={() => handleHover(4)}
                                onMouseLeave={handleLeave}
                            >
                            Login
                            </a>
                            <div style={styles.loginDropdown}>
                                <a
                                    href="/login"
                                    style={styles.dropdownItem(hovered === 5)}
                                    onMouseEnter={() => handleHover(5)}
                                    onMouseLeave={handleLeave}
                                >
                                    Login as User
                                </a>
                                <a
                                    href="/adminlogin"
                                    style={styles.dropdownItem(hovered === 6)}
                                    onMouseEnter={() => handleHover(6)}
                                    onMouseLeave={handleLeave}
                                >
                                    Login as Admin
                                </a>
                            </div>
                        </li>
                        <li style={styles.li}>
                            <a
                                onClick={signupUser}
                                style={styles.a(hovered === 5)}
                                onMouseEnter={() => handleHover(5)}
                                onMouseLeave={handleLeave}
                            >
                                Signup
                            </a>
                            <div style={styles.signupDropdown}>
                                <a
                                    href="/signup"
                                    style={styles.dropdownItem(hovered === 7)}
                                    onMouseEnter={() => handleHover(7)}
                                    onMouseLeave={handleLeave}
                                >
                                    Signup as User
                                </a>
                                <a
                                    href="/adminsignup"
                                    style={styles.dropdownItem(hovered === 8)}
                                    onMouseEnter={() => handleHover(8)}
                                    onMouseLeave={handleLeave}
                                >
                                    Signup as Admin
                                </a>
                            </div>
                        </li>
                    </>
                ) : (
                    <li style={styles.li}>
                        {isAdmin ? (
                            // For Admin: Only show Logout
                            <div style={{color: "red"}} onClick={logoutUser}>
                                <a
                                    style={styles.dropdownItem(false)}
                                    onClick={logoutUser}
                                >
                                    Logout
                                </a>
                            </div>
                        ) : (
                            // For Regular User: Show profile picture with first letter
                            <div
                                style={styles.profilePic}
                                onClick={toggleDropdown}
                            >
                                {firstLetter}
                            </div>
                        )}
                        {(!isAdmin && showDropdown) && (
                            <div style={styles.dropdown}>
                                <a
                                    style={styles.dropdownItem(false)}
                                    onClick={logoutUser}
                                >
                                    Logout
                                </a>
                            </div>
                        )}
                    </li>


                )}
            </ul>
        </div>
    );
};

export default Navbar;
