import React from "react";
import "./Card.scss";

interface Props {
  name: string;
  age?: string;
  gender?: string;
  country: string;
  imgUrl?: string;
}

const Card: React.FC<Props> = ({ name, age, gender, country, imgUrl }) => {
  return (
    <div className="card">
      <p>{name}</p>
      {!!age && <p>{age}</p>}
      {!!gender && <p>{gender}</p>}
      <p>{country}</p>
    </div>
  );
};

export default Card;
