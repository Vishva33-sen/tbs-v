import { useState } from "react";
import { useAuth } from "../utils/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [hovered, setHovered] = useState(null); // To track hover state

    const email = localStorage.getItem("email");
    const firstLetter = email ? email.charAt(0).toUpperCase() : "P";

    const loginUser = () => {
        navigate("/login");
    };

    const logoutUser = () => {
        localStorage.removeItem("email");
        logout();
        setShowDropdown(false);
        navigate("/home");
    };

    const toggleDropdown = () => {
        navigate("/dashboard");
        setShowDropdown(!showDropdown);
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
        },
        logo: {
            fontSize: "20px",
            fontWeight: "bold",
        },
        ul: {
            listStyle: "none",
            display: "flex",
            margin: 0,
            padding: 0,
            flexWrap: "wrap",
            justifyContent: "flex-end",
        },
        li: {
            margin: "0 15px",
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
            width: "30px",
            height: "30px",
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
            backgroundColor: "#333",
            borderRadius: "5px",
            top: "50px",
            right: "0px",
            padding: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            display: showDropdown ? "block" : "none",
        },
        dropdownItem: {
            padding: "10px",
            cursor: "pointer",
            color: "#fff",
            textDecoration: "none",
            display: "block",
        },
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
                {!isAuthenticated ? (
                    <>
                        <li style={styles.li}>
                            <a
                                onClick={loginUser}
                                style={styles.a(hovered === 2)}
                                onMouseEnter={() => handleHover(2)}
                                onMouseLeave={handleLeave}
                            >
                                Login
                            </a>
                        </li>
                        <li style={styles.li}>
                            <a
                                href="/signup"
                                style={styles.a(hovered === 3)}
                                onMouseEnter={() => handleHover(3)}
                                onMouseLeave={handleLeave}
                            >
                                Signup
                            </a>
                        </li>
                    </>
                ) : (
                    <>
                        <li style={styles.li}>
                            <div
                                style={styles.profilePic}
                                onClick={toggleDropdown}
                            >
                                {firstLetter}
                            </div>
                            <div style={styles.dropdown}>
                                <a
                                    style={styles.dropdownItem}
                                    onClick={logoutUser}
                                >
                                    Logout
                                </a>
                            </div>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Navbar;
