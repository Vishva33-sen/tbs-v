import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage'
import LocationAndSports from './pages/LocationAndSports';
import {AuthProvider} from "./utils/AuthContext.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import TurfDetails from "./Pages/TurfDetails.jsx";
import SlotDetails from "./Pages/SlotDetails.jsx";
import ConfirmPayment from "./Pages/ConfirmPayment.jsx";
import UserProfile from "./Pages/UserProfile.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import EditProfile from "./Pages/EditProfile.jsx";

const App = () => {
  return (

      <Router>
          <div className="app">
              <AuthProvider>
                  <Navbar />
                  <Routes>
                      <Route path="/home" element={<HomePage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/location" element={
                          <ProtectedRoute>
                              <LocationAndSports/>

                          </ProtectedRoute> }/>
                      <Route
                          path="/turfs" element={
                          <ProtectedRoute>
                              <TurfDetails />
                          </ProtectedRoute>}/>
                      <Route
                          path="/:turfId" element={
                          <ProtectedRoute>
                              <SlotDetails />
                          </ProtectedRoute>}/>
                      <Route
                          path="/confirmpayment" element={
                          <ProtectedRoute>
                              <ConfirmPayment />
                          </ProtectedRoute>}/>
                      <Route
                          path="/dashboard"
                          element={
                              <ProtectedRoute>
                                  <UserProfile />
                              </ProtectedRoute>
                          }
                      />
                      <Route
                          path="/wishlist"
                          element={
                              <ProtectedRoute>
                                  <Wishlist />
                              </ProtectedRoute>
                          }
                      />
                      <Route path="/editprofile" element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>
                      <Route path="/locationandsports" element={<ProtectedRoute><LocationAndSports/></ProtectedRoute>}></Route>

                  </Routes>
                  <Footer />
              </AuthProvider>
          </div>
      </Router>
  );
};

export default App;