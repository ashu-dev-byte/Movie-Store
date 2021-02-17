import React from "react";
import { useQuery, gql } from "@apollo/client";
import Card from "../Card/Card";
import "./Director.scss";

export const DIRECTOR_LIST_QUERY = gql`
  query getDirectorList {
    directors {
      id
      name
      age
      gender
      country
    }
  }
`;

interface Props {}

const Director: React.FC<Props> = (props) => {
  const { loading, error, data } = useQuery(DIRECTOR_LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <div className="director">
      <div className="containerDirector">
        {data.directors.map((director: any) => (
          <Card
            key={director.id}
            name={director.name}
            age={director.age}
            gender={director.gender}
            country={director.country}
          />
        ))}
      </div>
    </div>
  );
};

export default Director;
