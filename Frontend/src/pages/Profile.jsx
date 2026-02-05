import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    age: "",
    bio: "",
    gender: "Prefer not to say",
    location: { city: "", country: "" },
    socialLinks: { linkedin: "", github: "" },
    skills: "",
    avatar: "" // Backend se aane wali purani image string
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  // 1. Fetch Profile on Mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data.data;
        setUser({
          ...userData,
          skills: userData.skills ? userData.skills.join(", ") : "",
        });
        
        // Agar pehle se image hai toh preview mein dikhayein
        if (userData.avatar) {
          setPreview(`http://localhost:5000${userData.avatar}`);
        }
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // 2. Handle Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setUser((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 3. Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Local preview
    }
  };

  // 4. Unified Submit (Text + Image)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Updating profile...");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Append Basic Fields
      formData.append("name", user.name);
      formData.append("age", user.age);
      formData.append("bio", user.bio);
      formData.append("gender", user.gender);
      
      // Nested objects ko stringify karke ya individual keys mein bhejein
      formData.append("location[city]", user.location.city);
      formData.append("location[country]", user.location.country);
      formData.append("socialLinks[linkedin]", user.socialLinks.linkedin);
      formData.append("socialLinks[github]", user.socialLinks.github);

      // Skills string to Array conversion
      const skillsArray = user.skills.split(",").map(s => s.trim()).filter(s => s !== "");
      skillsArray.forEach((skill, index) => {
        formData.append(`skills[${index}]`, skill);
      });

      // Append Image if selected
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      const res = await api.patch("/profile/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });

      setMessage("Profile Updated Successfully! ✅");
      // Update local state with new image path from server
      if (res.data.data.avatar) {
        setPreview(`http://localhost:5000${res.data.data.avatar}`);
      }
    } catch (err) {
      setMessage("Update failed. ❌");
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Loading Profile...</div>;

  return (
    <div className="profile-container">
      <h2>Edit Your Profile</h2>
      {message && <p className={`status-msg ${message.includes('failed') ? 'error' : ''}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="profile-form">
        {/* Profile Picture Section */}
        <section className="avatar-section">
          <h3>Profile Picture</h3>
          <div className="avatar-preview-container">
            {preview ? (
              <img src={preview} alt="Preview" className="avatar-preview" />
            ) : (
              <div className="avatar-placeholder">{user.name.charAt(0)}</div>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} className="file-input" />
        </section>

        <section>
          <h3>Basic Info</h3>
          <input name="name" value={user.name} onChange={handleChange} placeholder="Full Name" required />
          <input name="age" type="number" value={user.age} onChange={handleChange} placeholder="Age" />
          <textarea name="bio" value={user.bio} onChange={handleChange} placeholder="Short Bio" />
          <select name="gender" value={user.gender} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </section>

        <section>
          <h3>Location</h3>
          <div className="grid-inputs">
            <input name="location.city" value={user.location.city} onChange={handleChange} placeholder="City" />
            <input name="location.country" value={user.location.country} onChange={handleChange} placeholder="Country" />
          </div>
        </section>

        <section>
          <h3>Socials & Skills</h3>
          <input name="socialLinks.github" value={user.socialLinks.github} onChange={handleChange} placeholder="GitHub Username" />
          <input name="socialLinks.linkedin" value={user.socialLinks.linkedin} onChange={handleChange} placeholder="LinkedIn URL" />
          <input name="skills" value={user.skills} onChange={handleChange} placeholder="Skills (e.g. React, Node)" />
        </section>

        <button type="submit" className="save-btn">Update All Details</button>
      </form>
    </div>
  );
};

export default Profile;