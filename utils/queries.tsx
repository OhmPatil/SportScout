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

const CREATE_EVENT = gql`
  mutation CreateEvent(
    $sportName: String!
    $eventName: String!
    $sportType: SportType!
    $capacity: Int!
    $eventDateTime: DateTime!
    $venue: String!
    $creator: String!
  ) {
    createEvent(
      data: {
        sportName: $sportName
        capacity: $capacity
        eventCreator: { connect: { email: $creator } }
        eventDateTime: $eventDateTime
        eventName: $eventName
        sportType: $sportType
        venue: $venue
      }
    ) {
      id
    }
  }
`;

const GET_ENROLLED_EVENTS = gql`
  query GetEnrolledEvents($email: String!) {
    appUser(where: { email: $email }) {
      enrolledEvents {
        eventName
        sportName
        sportType
        venue
        eventDateTime
      }
    }
  }
`;

export {
  GET_EVENTS,
  CREATE_USER,
  PUBLISH_USER,
  ADD_USER_TO_EVENT,
  PUBLISH_EVENT,
  CREATE_EVENT,
  GET_ENROLLED_EVENTS
};
