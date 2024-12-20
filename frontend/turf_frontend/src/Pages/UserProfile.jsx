import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        mobile_number: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) {
                    console.error('User email not found in localStorage.');
                    return;
                }

                const response = await fetch(`http://localhost:8081/home/user/${email}`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div style={styles.appContainer}>
            {/* Sidebar */}
            <div style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>My Dashboard</h2>
                <ul style={styles.menu}>
                    <li
                        style={styles.menuItem}
                        onMouseEnter={(e) => (e.target.style.background = '#3b82f6')}
                        onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                        onClick={() => navigate("/editprofile")}
                    >
                        Edit Profile
                    </li>
                    <li
                        style={styles.menuItem}
                        onMouseEnter={(e) => (e.target.style.background = '#3b82f6')}
                        onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                    >
                        My Bookings
                    </li>
                    <li
                        style={styles.menuItem}
                        onMouseEnter={(e) => (e.target.style.background = '#3b82f6')}
                        onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                        onClick={() => navigate("/wishlist")}
                    >
                        Wishlist
                    </li>
                    <li
                        style={styles.menuItem}
                        onMouseEnter={(e) => (e.target.style.background = '#3b82f6')}
                        onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                    >
                        Feedback
                    </li>
                    <li
                        style={styles.menuItem}
                        onMouseEnter={(e) => (e.target.style.background = '#3b82f6')}
                        onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                    >
                        Support
                    </li>
                </ul>
            </div>

            {/* Main Dashboard */}
            <div style={styles.dashboard}>
                {/* Profile Card */}
                <div style={styles.profileCard}>
                    <img
                        src="https://via.placeholder.com/100"
                        alt="Profile"
                        style={styles.profileImage}
                    />
                    <h3 style={styles.profileName}>{user.username}</h3>
                    <p style={styles.profileText}>{user.mobile_number}</p>
                    <p style={styles.profileText}>{user.email}</p>
                    <button
                        style={styles.saveButton}
                        onMouseEnter={(e) => (e.target.style.background = '#2563eb')}
                        onMouseLeave={(e) => (e.target.style.background = '#3b82f6')}
                    >
                        Save Changes
                    </button>
                </div>

                {/* Booking Details */}
                <div style={styles.bookingSection}>
                    <div style={styles.infoBox}>
                        <h3 style={styles.boxTitle}>My Turf Accounts</h3>
                        <p style={styles.infoText}>Active Booking: MV Turf</p>
                        <button
                            style={styles.cancelButton}
                            onMouseEnter={(e) => (e.target.style.background = '#dc2626')}
                            onMouseLeave={(e) => (e.target.style.background = '#ef4444')}
                        >
                            Cancel Booking
                        </button>
                        <button
                            style={styles.rescheduleButton}
                            onMouseEnter={(e) => (e.target.style.background = '#059669')}
                            onMouseLeave={(e) => (e.target.style.background = '#10b981')}
                        >
                            Reschedule
                        </button>
                    </div>

                    <div style={styles.infoBox}>
                        <h3 style={styles.boxTitle}>My Bookings</h3>
                        <p style={styles.infoText}>Booking 1: Football - Paid</p>
                        <p style={styles.infoText}>Booking 2: Tennis - Pending</p>
                        <p style={styles.infoText}>Booking 3: Cricket - Paid</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    appContainer: {
        display: 'flex',
        height: '100vh',
        fontFamily: '"Poppins", Arial, sans-serif',
        margin: 0,
        backgroundColor: '#f4f6f9',
    },

    /* Sidebar */
    sidebar: {
        width: '250px',
        backgroundColor: '#1e293b',
        color: '#fff',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    },
    sidebarTitle: {
        fontSize: '1.5rem',
        textAlign: 'center',
        marginBottom: '20px',
    },
    menu: {
        listStyle: 'none',
        padding: 0,
    },
    menuItem: {
        margin: '10px 0',
        padding: '12px',
        borderRadius: '8px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background 0.3s, color 0.3s',
    },

    /* Dashboard */
    dashboard: {
        flex: 1,
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    profileCard: {
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '25px',
        borderRadius: '10px',
        textAlign: 'center',
    },
    profileImage: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        marginBottom: '10px',
    },
    profileName: {
        fontSize: '1.4rem',
        color: '#333',
    },
    profileText: {
        color: '#555',
        margin: '5px 0',
    },
    saveButton: {
        marginTop: '15px',
        padding: '10px 20px',
        backgroundColor: '#3b82f6',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },

    /* Booking Section */
    bookingSection: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
    },
    infoBox: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    boxTitle: {
        fontSize: '1.2rem',
        marginBottom: '10px',
    },
    infoText: {
        color: '#555',
        margin: '5px 0',
    },
    cancelButton: {
        marginTop: '10px',
        padding: '8px 12px',
        backgroundColor: '#ef4444',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
    rescheduleButton: {
        marginTop: '10px',
        marginLeft: '10px',
        padding: '8px 12px',
        backgroundColor: '#10b981',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
};

export default DashboardPage;
