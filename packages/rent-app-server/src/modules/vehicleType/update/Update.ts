import { Resolver, Authorized, Mutation, Arg } from 'type-graphql';
import { VehicleTypeResponseUnion, ResponseError } from '../../shared';
import { UpdateVehicleTypeInput } from './UpdateInput';
import { VehicleType } from '../../../entities/vehicleTypes';




@Resolver()
export class UpdateVehicleTypeResolver {

    @Authorized(['admin'])
    @Mutation(() => VehicleTypeResponseUnion)
    async updateVehicleType(
        @Arg('input') {
            id,
            vehicleType,
            vehicleTypeDescription,
        }: UpdateVehicleTypeInput
    ) {
        try {
            const vtExists = await VehicleType.findOne({ id, vehicleType });

            if (!vtExists) {
                throw new Error('No vehicle with that id exists');
            }

            await VehicleType.update({ id, vehicleType }, { vehicleTypeDescription });
            return vtExists;
        } catch(err) {
            throw new ResponseError(
                err.message,
                'createVehicleType'
            );
        }
    }
}