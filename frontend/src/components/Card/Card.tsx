import React from "react";
import "./Card.scss";

interface Props {
  name: string;
  country: string;
  imgUrl?: string;
}

const Card: React.FC<Props> = ({ name, country, imgUrl }) => {
  return (
    <div className="card">
      {/* <img src={imgUrl} alt="John Wick" /> */}
      <p>{name}</p>
      <p>{country}</p>
    </div>
  );
};

export default Card;
