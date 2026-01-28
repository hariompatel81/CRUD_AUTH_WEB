import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");

  useEffect(() => {
    api.get("/profile/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      setUser(res.data.data);
      setBio(res.data.data.bio || "");
    })
    .catch(console.log);
  }, []);

  const handleUpdate = async () => {
    try {
      await api.put(
        "/profile/update",
        { bio },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Profile updated");
    } catch (error) {
      alert("Update failed");
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <img
            src={user.avatar || "https://via.placeholder.com/120"}
            className="profile-avatar"
          />

          <h2>{user.name}</h2>
          <p>{user.email}</p>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write your bio"
          />

          <button onClick={handleUpdate}>Update Profile</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
