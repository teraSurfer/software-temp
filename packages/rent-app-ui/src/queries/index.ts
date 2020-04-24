import gql from 'graphql-tag';
import { typeDefs, resolvers } from './resolvers';

const HELLO_QUERY = gql`
    query Hello {
        hello
    }
`;

const USER_LOGIN = gql`
    mutation Login($data: LoginInput!) {
        login(data: $data) {
            ... on User {
                id,
                email,
                firstName,
                lastName,
                roles {
                    id,
                    roleName
                }
            }
            ... on ResponseError {
                message,
                path
            }
        }
    }
`;

const LOGOUT = gql`
    mutation Logout {
        logout
    }
`;

const LOGGED_IN = gql`
    query loggedIn {
        loggedIn @client
    }
`;

const USER_STATE = gql`
    mutation UserState($value: Boolean!) {
        userState(value: $value) @client
    }
`;

const ME = gql`
    query Me {
        me {
            ... on User {
                id,
                email,
                firstName,
                lastName,
                roles {
                    id,
                    roleName
                }
            }
            ... on ResponseError {
                message,
                path
            }
        }
    }
`;

const ALL_USERS = gql`
    query FindAllUsers {
        findAllUsers {
            ... on User {
                id,
                email,
                firstName,
                lastName,
                roles {
                    roleName
                }
            }
            ... on ResponseError {
                message,
                path
            }
        }
    }
`;

const ALL_PRICES = gql`
    query FindAllPrices($take: Float, $skip: Float) {
    	findAllPrices(take: $take, skip: $skip) {
        ... on Price {
          id,
          name,
          cost,
          duration,
          vehicleType {
            vehicleType
          },
        }
      }
    }
`;

const ALL_LOCATIONS = gql`
    query FindAllLocations($take: Float, $skip: Float) {
    	findAllLocations(take: $take, skip: $skip) {
        ... on Location {
          id,
          locationName,
          addressFirstLine,
          addressSecondLine,
          addressThirdLine,
          addressZipCode,
          vehicleCapacity
        }
      }
    }
`;

const VEHICLE_TYPES = gql`
    query FindAllVehicleTypes {
        findAllVehicleTypes {
            ... on VehicleType {
                id,
                vehicleType
            }
        }
    }
`;

const ADMIN_COUNTS = gql`
  query GetCounts {
    getCounts {
      reservationCount,
      locationsCount,
      membersCount,
      vehiclesCount
    }
}
`;

const CREATE_PRICE = gql`
   mutation CreatePrice($data: CreatePriceInput!) {
       createPrice(data: $data) {
           ... on Price {
               id
           }
       }
   } 
`;


const GET_PRICE = gql`
    query GetPrice($id: Float!, $name: String) {
        findOnePrice(id: $id, name: $name) {
            ... on Price {
                id,
                name,
                cost,
                duration,
                vehicleType {
                    id,
                    vehicleType
                },
                payments {
                    id,
                    totalCost
                }
            }
        }
    }
`;

export {
    HELLO_QUERY,
    USER_LOGIN,
    ME,
    LOGGED_IN,
    LOGOUT,
    ALL_USERS,
    ALL_PRICES,
    CREATE_PRICE,
    USER_STATE,
    ADMIN_COUNTS,
    VEHICLE_TYPES,
    ALL_LOCATIONS,
    GET_PRICE,
    typeDefs,
    resolvers,
};
