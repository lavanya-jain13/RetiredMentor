import React from "react";

const MentorCard = ({ mentor, onClick }) => {
  return (
    <div className="mentor-card" onClick={onClick}>
      <h3>{mentor.name}</h3>
      <p className="mentor-subtext">{mentor.experience} years at {mentor.organization}</p>
      <p><strong>Expertise:</strong> {mentor.expertise}</p>
      <p className="mentor-description">{mentor.description}</p>
      <span className="status-badge">Retired</span>
    </div>
  );
};

export default MentorCard;
