import React from "react";
import "./information.scss";

import light_theme from "../../assets/icons/light_theme.svg";

function Information() {
  return (
    <div className="inf">
      <div className="inf__container">
        <div className="inf__header">
          <div className="inf__user">
            <img
              src="https://www.meme-arsenal.com/memes/7f7ac55cae30a63e926193968f5c4915.jpg"
              alt="user avatar"
            />
            <span>User</span>
          </div>
          <button type="button">
            <img src={light_theme} alt="theme switcher" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Information;
