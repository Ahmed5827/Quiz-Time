import React from "react";
import Agriculure from "../../../assets/Agriculture.jpeg";
import Books from "../../../assets/Books.jpeg";
import Medcine from "../../../assets/Medcine.jpeg";
import Technology from "../../../assets/Technology.jpeg";
import Comics from "../../../assets/Comics.jpg";
import History from "../../../assets/History.jpg";
import Music from "../../../assets/Music.jpg";
import science from "../../../assets/Science & Nature.jpg";
import Sports from "../../../assets/sports.jpg";
import Politcs from "../../../assets/Politics.jpg";
import Arts from "../../../assets/Art.jpg";
import "./Category.css";
import { Navigate, useNavigate } from "react-router-dom";

function Category(Props) {
  const navigate = useNavigate();

  const x = {
    Agriculture: Agriculure,
    "Entertainment: Books": Books,
    Medcine: Medcine,
    "Science: Computers": Technology,
    "Entertainment: Comics": Comics,
    History: History,
    "Entertainment: Music": Music,
    "Science & Nature": science,
    Sports: Sports,
    Politics: Politcs,
    Art: Arts,
  };
  const selectedimg = () => {
    if (Props.image in x) {
      return x[Props.image];
    } else {
      return x["Agriculure"];
    }
  };

  return (
    <div onClick={() => navigate("/Quiz", { state: { image: Props.image } })}>
      <div
        className="category"
        style={{
          backgroundImage: `url(${selectedimg()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h5 className="text-position">{Props.image}</h5>
      </div>
    </div>
  );
}
export default Category;
