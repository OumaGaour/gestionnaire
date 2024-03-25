// SubmitAnimation.jsx
import React from "react";
import PropTypes from "prop-types";

function SubmitAnimation(props) {
  const { currentState } = props;
  return (
    <div className="container" style={{ marginBottom: "15px" }}>
      <button
        className={`animatedButton ${currentState}`}
        type="submit" // Ajoutez ceci pour que le bouton fonctionne comme un bouton de soumission
        style={{ fontSize: "1.5rem", padding: "10px 20px" }} // Styles pour agrandir le bouton
      />
    </div>
  );
}

SubmitAnimation.propTypes = {
  currentState: PropTypes.string.isRequired
};

export default SubmitAnimation;
