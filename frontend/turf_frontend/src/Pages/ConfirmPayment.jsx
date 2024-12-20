import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ConfirmPayment() {
    const [turfDetails, setTurfDetails] = useState(null);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve turf details and selected slots from local storage
        const storedTurfDetails = localStorage.getItem("turfDetails");
        const storedSelectedSlots = localStorage.getItem("selectedSlots");

        if (storedTurfDetails && storedSelectedSlots) {
            const parsedTurfDetails = JSON.parse(storedTurfDetails);
            const parsedSelectedSlots = JSON.parse(storedSelectedSlots);

            if (typeof parsedTurfDetails.sports === "string") {
                parsedTurfDetails.sports = JSON.parse(parsedTurfDetails.sports);
            }

            setTurfDetails(parsedTurfDetails);
            setSelectedSlots(parsedSelectedSlots);

            // Calculate total amount
            const total = parsedSelectedSlots.length * parsedTurfDetails.price;
            setTotalAmount(total);
        }
    }, []);

    const handlePayNow = () => {
        alert("Redirecting to payment page...");
        navigate("/payment"); // Navigate to the payment page
    };

    return (
        <div
            style={{
                padding: "40px 20px",
                fontFamily: "Roboto, Arial, sans-serif",
                background: "linear-gradient(135deg, #121212, #1f1f1f)", // Darker background to match previous pages
                color: "#fff",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    color: "#00d4ff", // Consistent with previous pages
                    fontSize: "40px",
                    fontWeight: "700",
                    marginBottom: "40px", // Increased bottom margin for spacing
                    textTransform: "uppercase",
                }}
            >
                Confirm Payment
            </h1>
            {turfDetails && (
                <div
                    style={{
                        marginBottom: "30px", // Increased spacing between sections
                        padding: "25px",
                        borderRadius: "12px",
                        background: "#2c2c2c",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)", // Enhanced box shadow for 3D effect
                        width: "100%",
                        maxWidth: "700px", // Consistent width for all boxes
                    }}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            color: "#00d4ff", // Matching color for headers
                            fontSize: "26px",
                            fontWeight: "600",
                            marginBottom: "15px",
                        }}
                    >
                        Turf Details
                    </h2>
                    <p><strong>Name:</strong> {turfDetails.turfname}</p>
                    <p><strong>Location:</strong> {turfDetails.location}</p>
                    <p><strong>Price per Slot:</strong> ₹{turfDetails.price}</p>
                    <p><strong>Sports Available:</strong> {turfDetails.sports.join(", ")}</p>
                </div>
            )}
            {selectedSlots.length > 0 ? (
                <div
                    style={{
                        marginBottom: "30px",
                        padding: "25px",
                        borderRadius: "12px",
                        background: "#2c2c2c",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)", // Enhanced box shadow for 3D effect
                        width: "100%",
                        maxWidth: "700px", // Consistent width for all boxes
                    }}
                >
                    <h2
                        style={{
                            textAlign: "center",
                            color: "#00d4ff", // Matching color for headers
                            fontSize: "26px",
                            fontWeight: "600",
                            marginBottom: "15px",
                        }}
                    >
                        Selected Slots
                    </h2>
                    <ul
                        style={{
                            listStyleType: "none",
                            padding: 0,
                            fontSize: "16px",
                            textAlign: "center", // Center-aligning the slots
                        }}
                    >
                        {selectedSlots.map((slot, index) => (
                            <li key={index} style={{ marginBottom: "10px" }}>
                                <strong>Date:</strong> {slot.date}, <strong>Time:</strong> {slot.time}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p style={{ textAlign: "center", fontSize: "18px", color: "#aaa" }}>
                    No slots selected.
                </p>
            )}
            <div
                style={{
                    marginBottom: "30px",
                    padding: "20px",
                    borderRadius: "12px",
                    background: "#2c2c2c",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)", // Enhanced box shadow for 3D effect
                    width: "100%",
                    maxWidth: "700px", // Consistent width for all boxes
                    textAlign: "center",
                }}
            >
                <h3 style={{ fontSize: "28px", color: "#00d4ff", fontWeight: "bold" }}>
                    Total Amount: ₹{totalAmount}
                </h3>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: "700px", // Consistent width for all boxes and button
                }}
            >
                <button
                    style={{
                        background: "linear-gradient(135deg, #00d4ff, #007bff)", // Matching previous button color
                        color: "#fff",
                        fontSize: "18px",
                        padding: "12px 30px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.4)", // Enhanced button shadow for 3D effect
                        width: "100%", // Same width as the boxes
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = "linear-gradient(135deg, #007bff, #0056b3)";
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "linear-gradient(135deg, #00d4ff, #007bff)";
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.4)";
                    }}
                    onClick={handlePayNow}
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
}

export default ConfirmPayment;
