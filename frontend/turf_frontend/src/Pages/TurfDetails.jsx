import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function TurfDetails() {
    const [searchParams] = useSearchParams();
    const [turfs, setTurfs] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [ratings, setRatings] = useState({});
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);
    const userEmail = localStorage.getItem("email");

    useEffect(() => {
        const location = searchParams.get("location");
        const sport = searchParams.get("sport");

        axios
            .get(`http://localhost:8081/home/turfs?location=${location}&sport=${sport}`)
            .then((response) => {
                setTurfs(response.data);

                const initialRatings = {};
                response.data.forEach((turf) => {
                    initialRatings[turf.turfid] = turf.rating || 0;
                });
                setRatings(initialRatings);
            });
    }, [searchParams]);

    const handleSelectSlot = (turfId) => {
        navigate(`/${turfId}`);
    };
    // Fetch user's wishlist on component mount
    useEffect(() => {
        if (userEmail) {
            axios
                .get(`http://localhost:8081/home/wishlist`, { params: { email: userEmail } })
                .then((response) => {
                    setWishlist(response.data); // Response should be an array of turf IDs
                })
                .catch((error) => console.error("Error fetching wishlist:", error));
        }
    }, [userEmail]);

    const handleWishlistToggle = (turfId) => {
        console.log("Toggling wishlist for Turf ID:", turfId);
        axios
            .post("http://localhost:8081/home/toggle", null, {
                params: { email: userEmail, turfId: turfId },
            })
            .then(() => {
                // Update wishlist state
                setWishlist((prevWishlist) =>
                    prevWishlist.includes(turfId)
                        ? prevWishlist.filter((id) => id !== turfId)
                        : [...prevWishlist, turfId]
                );
            })
            .catch((error) => console.error("Error toggling wishlist:", error));
    };

    const handleRatingClick = (turfId, newRating) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [turfId]: newRating,
        }));
    };

    const containerStyle = {
        color: "white",
        background: "url('../assets/plain_background.jpg') no-repeat center center fixed",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "75px",
        minHeight: "100vh",
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "50px",
        width: "90%",
        margin: "0 auto",
        marginBottom: "50px",
    };

    const cardStyle = (isHovered) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "rgba(0,0,0,0.5)",
        boxShadow: isHovered
            ? "0 4px 15px rgba(0, 188, 212, 1)"
            : "0 2px 5px rgba(0, 0, 0, 0.1)",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        borderColor: isHovered ? "rgb(0, 188, 212)" : "#ccc",
        width: "100%",
        maxWidth: "400px",
        margin: "auto",
    });

    const imgContainerStyle = {
        height: "180px",
        width: "100%",
        borderRadius: "8px",
        backgroundColor: "#ddd",
        backgroundImage: "url('../assets/turf.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginBottom: "10px",
    };

    const buttonStyle = {
        backgroundColor: "#00bcd4",
        color: "white",
        padding: "8px 12px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s ease",
        marginTop: "10px",
    };

    const buttonHoverStyle = {
        backgroundColor: "#008ba3",
    };

    const starStyle = {
        fontSize: "20px",
        cursor: "pointer",
        color: "#f39c12",
        transition: "color 0.2s ease",
    };

    const heartStyle = {
        cursor: "pointer",
        color: "#ccc",
        fontSize: "24px",
        transition: "color 0.3s ease",
    };

    const heartActiveStyle = {
        color: "red",
    };

    const h1Style = {
        paddingLeft: "20px",
    };

    return (
        <div style={containerStyle}>
            <h1 style={h1Style}>Turf Details</h1>
            {turfs.length > 0 ? (
                <div style={gridStyle}>
                    {turfs.map((turf) => {
                        const turfRating = ratings[turf.turfid] || 0;

                        return (
                            <div
                                key={turf.turfid}
                                style={cardStyle(hoveredCard === turf.turfid)}
                                onMouseEnter={() => setHoveredCard(turf.turfid)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div style={imgContainerStyle}></div>
                                <div>
                                    <h2>{turf.turfname}</h2>
                                    <p>Location: {turf.location}</p>
                                    <p>Price: ${turf.price}</p>
                                    <p>Contact: {turf.mobilenumber}</p>
                                </div>
                                <div>
                                    {[...Array(5)].map((_, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                ...starStyle,
                                                color: index < turfRating ? "#f39c12" : "#ccc",
                                            }}
                                            onClick={() =>

                                                handleRatingClick(turf.turfid, index + 1)
                                            }
                                        >
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                                <button
                                    style={buttonStyle}
                                    onMouseEnter={(e) =>
                                        Object.assign(e.currentTarget.style, buttonHoverStyle)
                                    }
                                    onMouseLeave={(e) =>
                                        Object.assign(e.currentTarget.style, buttonStyle)
                                    }
                                    onClick={() => handleSelectSlot(turf.turfid)}
                                >
                                    Select Slot
                                </button>
                                <div
                                    style={heartStyle}
                                    onClick={() =>{
                                        console.log("Heart Clicked for Turf ID:", turf.turfid);
                                        handleWishlistToggle(turf.turfid);
                                }}
                                >
                                    <span
                                        style={
                                            wishlist.includes(turf.turfid)
                                                ? heartActiveStyle
                                                : {}
                                        }
                                    >
                                        &#9829;
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No turfs available for the selected location and sport.</p>
            )}
        </div>
    );
}

export default TurfDetails;
