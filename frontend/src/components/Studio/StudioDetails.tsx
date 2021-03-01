import React from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import "./Studio.scss";

const GET_STUDIO_QUERY = gql`
  query getStudio($id: String!) {
    studio(id: $id) {
      name
      country
      contents {
        id
        name
      }
    }
  }
`;

interface Props extends RouteComponentProps<{ studioId: string }> {}

const StudioDetails: React.FC<Props> = ({ match }) => {
  const studioId = match.params.studioId;

  const { loading, error, data } = useQuery(GET_STUDIO_QUERY, {
    variables: { id: studioId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="getStudio">
      <h1>{data.studio.name}</h1>
      <h2>{data.studio.country}</h2>
      <hr />
      {!!data.studio.contents.length ? (
        data.studio.contents.map((content: any) => (
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

export default StudioDetails;
