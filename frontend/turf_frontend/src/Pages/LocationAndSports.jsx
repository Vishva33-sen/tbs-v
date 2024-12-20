import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const LocationAndSports = () => {
    const [locations, setLocations] = useState([]);
    const [sports, setSports] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch locations from backend
        axios.get("http://localhost:8081/home/locations")
            .then((response) => setLocations(response.data))
            .catch((error) => console.error("Error fetching locations:", error));

        // Fetch sports from backend
        axios.get("http://localhost:8081/home/sports")
            .then((response) => setSports(response.data))
            .catch((error) => console.error("Error fetching sports:", error));
    }, []);

    const handleSportClick = (location, sport) => {

        console.log(location);
        console.log(sport);
        if (location && sport) {
            navigate(`/turfs?location=${location}&sport=${sport}`);
        } else {
            alert("Please select a location first!");
        }
    };

    // Function to get the image path based on the sport name
    const getSportImage = (sport) => {
        const sportImageMap = {
            tennis: "tennis.jpeg",
            football: "football.jpg",
            volleyball: "volleyball.jpg",
            badminton: "badminton.jpg",
            cricket: "cricket.jpg",
            basketball: "basketball.jpeg",
        };

        // Default image if the sport is not found in the map
        return `/images/${sportImageMap[sport] || "default.jpg"}`;
    };


    return (
        <div>
            <style>
                {`
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background: url('../assets/plain_background.jpg');
                    background-size: cover;
                    background-position: center;
                    background-color:black;
                }

                .locsportpage {
                    background: url('../assets/plain_background.jpg');
                    background-size: cover;
                    background-position: center;
                    color: white;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom:100px;
                    padding: 20px;
                    box-sizing: border-box;
                }

                .locsportpage h2 {
                    margin-top: 100px;
                }

                .dropdown-container {
                    margin-top: 20px;
                }

                .dropdown {
                    padding: 10px;
                    font-size: 18px;
                    width: 200px;
                    border-radius: 8px;
                    border: 1px solid #ccc;
                    background-color: rgb(226, 226, 226);
                    color: rgb(0, 188, 212);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .dropdown:focus {
                    outline: none;
                    border-color: rgb(0, 188, 212);
                }

                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 40px;
                    margin-top: 40px;
                    width: 90%;
                }

                .grid-item {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    cursor: pointer;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .grid-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 10px 10px 20px rgba(0, 188, 212, 1);
                }

                .sport-image {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }

                @media (max-width: 768px) {
                    .grid-container {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 480px) {
                    .grid-container {
                        grid-template-columns: 1fr;
                    }

                    .dropdown {
                        width: 100%;
                    }

                    .locsportpage h2 {
                        font-size: 20px;
                    }
                }
                `}
            </style>

            <div className="locsportpage">
                <h2>Select Location and Sport</h2>
                <div className="dropdown-container">
                    <select
                        className="dropdown"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                        <option value="">Select Location</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid-container">
                    {sports.length > 0 ? (
                        sports.map((sport, index) => (
                            <div
                                key={index}
                                className="grid-item"
                                onClick={() => handleSportClick(selectedLocation, sport)}
                            >
                                <img
                                    src={getSportImage(sport)}
                                    alt={sport}
                                    className="sport-image"
                                />
                            </div>
                        ))
                    ) : (
                        <p>No sports available...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocationAndSports;
