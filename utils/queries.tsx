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
      about
      enrolledAppUsers {
        email
      }
      image {
        url
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
    $imageID: ID!
    $about: String!
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
        about: $about
        image: { connect: { id: $imageID } }
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
        capacity
        about
        image {
          url
        }
      }
    }
  }
`;

const GET_CREATED_EVENTS = gql`
  query GetCreatedEvents($email: String!) {
    events(where: { eventCreator: { email: $email } }) {
      id
      eventName
      eventDateTime
      capacity
      sportName
      sportType
      venue
      about
      enrolledAppUsers {
        id
        name
        email
        dob
        gender
      }
      image {
        url
      }
    }
  }
`;

const CREATE_IMAGE_ASSET = gql`
  mutation CreateAsset($url: String!) {
    createAsset(data: { uploadUrl: $url }) {
      id
    }
  }
`;

const PUBLISH_IMAGE_ASSET = gql`
  mutation PublishAsset($id: ID!) {
    publishAsset(where: { id: $id }) {
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
  CREATE_EVENT,
  GET_ENROLLED_EVENTS,
  GET_CREATED_EVENTS,
  CREATE_IMAGE_ASSET,
  PUBLISH_IMAGE_ASSET,
};
