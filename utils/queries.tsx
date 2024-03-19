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

const ADD_USER_TO_EVENT = gql`
  mutation AddUsertoEvent($id: ID!, $email: String!) {
    updateEvent(
      where: { id: $id }
      data: { enrolledAppUsers: { connect: { where: { email: $email } } } }
    ) {
      id
    }
  }
`;

const PUBLISH_EVENT = gql`
  mutation PublishEvent($id: ID!) {
    publishEvent(where: { id: $id }) {
      id
    }
  }
`;

export {
  GET_EVENTS,
  CREATE_USER,
  PUBLISH_USER,
  ADD_USER_TO_EVENT,
  PUBLISH_EVENT,
};
