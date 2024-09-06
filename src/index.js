import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "OK", "Good", "Amazing"]}
    />
    <StarRating
      size={24}
      maxRating={12}
      color="#987865"
      className="test"
      defaultRating={3}
    />
  </React.StrictMode>
);
