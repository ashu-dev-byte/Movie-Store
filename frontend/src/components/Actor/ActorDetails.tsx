import React from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import "./Actor.scss";

const GET_ACTOR_QUERY = gql`
  query getActor($id: String!) {
    actor(id: $id) {
      name
      age
      gender
      country
      contents {
        id
        name
      }
    }
  }
`;

interface Props extends RouteComponentProps<{ actorId: string }> {}

const ActorDetails: React.FC<Props> = ({ match }) => {
  const actorId = match.params.actorId;

  const { loading, error, data } = useQuery(GET_ACTOR_QUERY, {
    variables: { id: actorId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="getActor">
      <h1>{data.actor.name}</h1>
      <h2>{data.actor.age}</h2>
      <h2>{data.actor.gender}</h2>
      <h2>{data.actor.country}</h2>
      <hr />
      {!!data.actor.contents.length ? (
        data.actor.contents.map((content: any) => (
          <NavLink className="navLinkContent" to={`/content/${content.id}`}>
            <p key={content.id}>{content.name}</p>
          </NavLink>
        ))
      ) : (
        <p>No movies</p>
      )}
    </div>
  );
};

export default ActorDetails;
