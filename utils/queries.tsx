import { gql } from "@apollo/client";

const GET_EVENTS = gql`
  query FetchEvents {
    events {
      eventName
      eventDateTime
      isActive
      sportName
      sportType
      venue
      id
      capacity
      enrolledAppUsers {
        email
        name
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $gender: Gender
    $dob: Date!
  ) {
    createAppUser(
      data: { name: $name, email: $email, gender: $gender, dob: $dob }
    ) {
      id
    }
  }
`;

const PUBLISH_USER = gql`
  mutation PublishUser($id: ID!) {
    publishAppUser(where: { id: $id }) {
      id
    }
  }
`;

export { GET_EVENTS, CREATE_USER, PUBLISH_USER };
