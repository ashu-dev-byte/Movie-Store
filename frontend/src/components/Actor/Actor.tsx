import React from "react";
import { useQuery, gql } from "@apollo/client";
import Card from "../Card/Card";
import "./Actor.scss";

const ACTOR_LIST_QUERY = gql`
  query getActorList {
    actors {
      name
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
      <div className="container">
        {data.actors.map((actor: any) => (
          <Card name={actor.name} country={actor.country} />
        ))}
      </div>
    </div>
  );
};

export default Actor;
