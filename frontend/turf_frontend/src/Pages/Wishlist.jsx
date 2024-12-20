import { useEffect, useState } from "react";

const WishlistPage = () => {
    const [wishlistTurfs, setWishlistTurfs] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const email = localStorage.getItem("email");
                if (!email) {
                    console.error("User email not found in localStorage.");
                    return;
                }

                // Fetch wishlist for the user
                const userResponse = await fetch(`http://localhost:8081/home/wishlist?email=${email}`);
                if (!userResponse.ok) {
                    console.error("Failed to fetch user data:", userResponse.statusText);
                    return;
                }

                const userData = await userResponse.json();
                const wishlist = userData.wishlist; // Array of turf IDs

                if (wishlist.length === 0) {
                    console.log("Wishlist is empty.");
                    setWishlistTurfs([]);
                    return;
                }

                // Fetch detailed turf info for each turf ID
                const turfDetailsPromises = wishlist.map((turfId) =>
                    fetch(`http://localhost:8081/home/turf/${turfId}`).then((res) => res.json())
                );

                const turfDetails = await Promise.all(turfDetailsPromises);
                setWishlistTurfs(turfDetails);
            } catch (error) {
                console.error("Error fetching wishlist data:", error);
            }
        };

        fetchWishlist();
    }, []);

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.title}>My Wishlist</h1>
            {wishlistTurfs.length === 0 ? (
                <p style={styles.emptyText}>Your wishlist is empty.</p>
            ) : (
                <div style={styles.grid}>
                    {wishlistTurfs.map((turf) => (
                        <div key={turf.turfid} style={styles.card}>
                            <h2 style={styles.cardTitle}>{turf.turfname}</h2>
                            <p>Location: {turf.location}</p>
                            <p>Price: ₹{turf.price}</p>
                            <p>Sports: {JSON.parse(turf.sports).join(", ")}</p>
                            <p>Contact: {turf.mobilenumber}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    pageContainer: {
        padding: "20px",
        fontFamily: '"Poppins", Arial, sans-serif',
    },
    title: {
        fontSize: "2rem",
        marginBottom: "20px",
        textAlign: "center",
    },
    emptyText: {
        textAlign: "center",
        fontSize: "1.2rem",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
    },
    card: {
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "15px",
        borderRadius: "8px",
    },
    cardTitle: {
        fontSize: "1.5rem",
        marginBottom: "10px",
        color: "#3b82f6",
    },
};

export default WishlistPage;
