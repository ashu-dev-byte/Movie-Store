import React from "react";
import { useQuery, gql } from "@apollo/client";
import { NavLink } from "react-router-dom";
import Card from "../Card/Card";
import "./Actor.scss";

export const ACTOR_LIST_QUERY = gql`
  query getActorList {
    actors {
      id
      name
      age
      gender
      country
    }
  }
`;

interface Props {}

const Actor: React.FC<Props> = (props) => {
  const { loading, error, data } = useQuery(ACTOR_LIST_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <div className="actor">
      <div className="containerActor">
        {data.actors.map((actor: any) => (
          <NavLink className="navLinkActor" to={`/actor/${actor.id}`}>
            <Card
              key={actor.id}
              name={actor.name}
              age={actor.age}
              gender={actor.gender}
              country={actor.country}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Actor;
