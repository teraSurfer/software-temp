import { Role } from '../entities/roles';

interface ICheckPermissions {
    roleId: number;
    controller: string;
    action: string;
}

export const checkPermissions = async ({ roleId, controller, action }: ICheckPermissions) => {
    try {
        const doesRightMatchRole = await Role.createQueryBuilder('role')
                                             .innerJoinAndSelect('role.rights', 'right', 'right.controller = :controller AND right.action = :action', { controller, action })
                                             .where('role.id = :roleId', { roleId })
                                             .getOne();
        console.log(doesRightMatchRole);
        if(doesRightMatchRole) return true;
        
        return false;
    } catch (err) {
        console.error(err);
        return false;
    }
}
