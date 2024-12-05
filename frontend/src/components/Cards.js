import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import AI from "../Images/ai.jpg";
import CVPR from "../Images/cvpr.jpg";
import COLA from "../Images/cola.jpg";
import ML from "../Images/ml.jpg";

function Cards() {
  return (
    <div className="cards">
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem src={AI} text="Artificial Intelligence" path="/cs.AI" />
            <CardItem
              src={CVPR}
              text="Computer Vision and Pattern Recognition"
              path="/cs.CV"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src={COLA}
              text="Computation and Language"
              path="/cs.CL"
            />
            <CardItem src={ML} text="Machine Learning" path="/cs.LG" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
