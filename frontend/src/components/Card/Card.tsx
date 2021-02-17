import React from "react";
import "./Card.scss";

interface Props {
  name: string;
  age?: string;
  gender?: string;
  country?: string;
  contentCategory?: string;
  yearOfRelease?: number;
  budget?: number;
  boxOfficeCollection?: number;
  boxOfficeStatus?: string;
  genre?: Array<string>;
  imgUrl?: string;
}

const Card: React.FC<Props> = ({
  name,
  age,
  gender,
  country,
  contentCategory,
  yearOfRelease,
  budget,
  boxOfficeCollection,
  boxOfficeStatus,
  genre,
}) => {
  return (
    <div className="card">
      <p>
        <h3>{name}</h3>
      </p>
      {!!age && <p>{age}</p>}
      {!!gender && <p>{gender}</p>}
      {!!contentCategory && (
        <p>
          <b>ContentType: </b>
          {contentCategory}
        </p>
      )}
      {!!yearOfRelease && (
        <p>
          <b>Year: </b>
          {yearOfRelease}
        </p>
      )}
      {!!country && (
        <p>
          <b>Country: </b>
          {country}
        </p>
      )}
      {!!budget && (
        <p>
          <b>Budget: </b>
          {budget}
        </p>
      )}
      {!!boxOfficeCollection && contentCategory === "Movie" && (
        <p>
          <b>Collection: </b>
          {boxOfficeCollection}
        </p>
      )}
      {!!boxOfficeStatus && (
        <p>
          <b>Status: </b>
          {boxOfficeStatus}
        </p>
      )}
      {!!genre && (
        <p>
          <b>Genre: </b>
          {genre.map((gen) => (
            <span key={gen}>{gen}, </span>
          ))}
        </p>
      )}
    </div>
  );
};

export default Card;
