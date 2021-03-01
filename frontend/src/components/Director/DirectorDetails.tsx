import React from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import "./Director.scss";

const GET_DIRECTOR_QUERY = gql`
  query getDirector($id: String!) {
    director(id: $id) {
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

interface Props extends RouteComponentProps<{ directorId: string }> {}

const DirectorDetails: React.FC<Props> = ({ match }) => {
  const directorId = match.params.directorId;

  const { loading, error, data } = useQuery(GET_DIRECTOR_QUERY, {
    variables: { id: directorId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="getDirector">
      <h1>{data.director.name}</h1>
      <h2>{data.director.age}</h2>
      <h2>{data.director.gender}</h2>
      <h2>{data.director.country}</h2>
      <hr />
      {!!data.director.contents.length ? (
        data.director.contents.map((content: any) => (
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

export default DirectorDetails;
