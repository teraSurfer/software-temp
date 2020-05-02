export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    roles?: Roles[];
}

export interface Roles {
    id: number;
    roleName: string;
    roleDescription?: string;
}

export interface ILocation {
    id?: string | number;
    locationName: string;
    addressFirstLine: string;
    addressSecondLine: string;
    addressThirdLine: string;
    addressZipCode: string;
    vehicleCapacity: number | string;
}

export interface IVehicle {
    id?: string | number;
    make: string;
    model: string;
    year: string | number;
    registrationTag: string;
    currentMileage: string | number;
    lastServiced: string;
    condition: string;
    vehicleType: string;
    location: string;
}

export interface IVehicleType {
    id?: string | number;
    vehicleType: string;
    vehicleDescription: string;
}
