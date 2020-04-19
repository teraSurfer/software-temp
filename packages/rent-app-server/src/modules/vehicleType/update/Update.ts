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

            const vt = VehicleType.update({ id }, { vehicleType, vehicleTypeDescription });
            return vt;
        } catch(err) {
            throw new ResponseError(
                err.message,
                'createVehicleType'
            );
        }
    }
}