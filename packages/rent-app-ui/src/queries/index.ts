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
        }
    }
`;

const REGISTER_USER = gql`
    mutation Register($data: RegisterInput!) {
        register(data: $data) {
            ... on User {
                id
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
    query FindAllUsers($skip: Float, $take: Float) {
        findAllUsers(skip: $skip, take: $take) {
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
                    paymentDate,
                    totalCost
                }
            }
        }
    }
`;

const UPDATE_PRICE = gql`
    mutation UpdatePrice($data: UpdatePriceInput!) {
        updatePrice(data: $data) {
            ... on Price {
                id
            }
        }
    } 

`;

const FETCH_LOCATION = gql`
query FindLocation($id: Float) {
  findLocation(id: $id) {
    ... on Location {
      id,
      locationName,
      addressFirstLine,
      addressSecondLine,
      addressThirdLine,
      addressZipCode,
      vehicleCapacity
      vehicles {
        id,
        make,
        model,
        registrationTag
      }
    }
  }
}
`;

const UPDATE_LOCATION = gql`
    mutation UpdateLocation($data: UpdateLocationInput!) {
        updateLocation(data: $data) {
            ... on Location {
                id
            }
        }
    }

`;

const CREATE_LOCATION = gql`
    mutation CreateLocation($data: CreateLocationInput!) {
        createLocation(data: $data) {
            ... on Location {
                id
            }
        }
    }
`;

const GET_ROLES = gql`
    query findAllRoles {
        findAllRoles {
            ... on Role {
                id,
                roleName
            }
        }
    }
`;


const CREATE_USER = gql`
    mutation createUser($input: CreateUserInput!) {
        createUser(input: $input) {
            ... on User {
                id
            }
        }
    }
`;

const GET_VEHICLES = gql`
    query findAllVehicles($skip: Float, $take: Float) {
        findAllVehicles(skip: $skip, take: $take) {
           ... on Vehicle {
               id,
               make,
               model,
               registrationTag
           }
        }
    }
`;

const UPDATE_VEHICLE = gql`
    mutation updateVehicle($data: UpdateVehicleInput!) {
        updateVehicle(data: $data) {
            ... on Vehicle {
                id
            }
        }
    }
`;

const FETCH_VEHICLE = gql`
    query findVehicle($id: String!) {
        findVehicle(id: $id) {
            ... on Vehicle {
                id,
                make,
                model,
                year,
                registrationTag,
                currentMileage,
                lastServiced,
                condition,
                vehicleType {
                    id,
                    vehicleType
                },
                location {
                    id,
                    locationName
                }
            }
        }
    }
`;

const CREATE_VEHICLE = gql`
    mutation createVehicle($data: CreateVehicleInput!) {
        createVehicle(data: $data) {
            ... on Vehicle {
                id
            }
        }
    }
`;

const GET_PAYMENTS = gql`
    query getPayments($skip: Float, $take: Float) {
        getPayments(skip: $skip, take: $take) {
            id,
            totalCost,
            paymentDate
        }
    }
`;

const GET_RESERVATIONS = gql`
    query getReservations($skip: Float, $take: Float) {
        findAllReservation(skip: $skip, take: $take) {
            ... on Reservation {
                id,
                status,
                reservationStart,
                reservationStart
            }
        }
    }
`;


const GET_VEHICLE_TYPES = gql`
    query getVehicleTypes($skip: Float, $take: Float) {
        findAllVehicleTypes(skip: $skip, take: $take) {
            ... on VehicleType {
                id,
                vehicleType,
                vehicleTypeDescription
            }
        }
    }
`;

const GET_VEHICLE_TYPE = gql`
    query getVehicleType($id: Float) {
        findOneVehicleType(id: $id) {
            ... on VehicleType {
                id,
                vehicleType,
                vehicleTypeDescription
            }
        }
    }
`;

const CREATE_VEHICLE_TYPE = gql`
    mutation createVehicleType($input: CreateVehicleTypeInput!) {
        createVehicleType(input: $input) {
            ... on VehicleType {
                id
            }
        }
    }
`;

const UPDATE_VEHICLE_TYPE = gql`
    mutation updateVehicleType($input: UpdateVehicleTypeInput!) {
        updateVehicleType(input: $input) {
            ... on VehicleType {
                id
            }
        }
    }
`;

export {
    HELLO_QUERY,
    USER_LOGIN,
    REGISTER_USER,
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
    UPDATE_PRICE,
    FETCH_LOCATION,
    UPDATE_LOCATION,
    CREATE_LOCATION,
    GET_ROLES,
    CREATE_USER,
    GET_VEHICLES,
    CREATE_VEHICLE,
    FETCH_VEHICLE,
    UPDATE_VEHICLE,
    GET_PAYMENTS,
    GET_RESERVATIONS,
    GET_VEHICLE_TYPES,
    GET_VEHICLE_TYPE,
    CREATE_VEHICLE_TYPE,
    UPDATE_VEHICLE_TYPE,
    typeDefs,
    resolvers,
};
