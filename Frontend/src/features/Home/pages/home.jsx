import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/player";

const Home = () => {
  return (
    <div>
      {" "}
      <h1>Home Page</h1>
      <FaceExpression />
      <Player />
    </div>
  );
};

export default Home;
