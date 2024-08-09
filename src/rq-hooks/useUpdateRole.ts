
import { QueryService } from '@/app/services/QueryService';
import { useMutation } from '@tanstack/react-query';

export type UpdateRoleMutationParams = {
    userId: string | null;
    roleId: string | null;
}

const updateRole = async (params: UpdateRoleMutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.updateRole(params.userId as string, params.roleId as string);
    return data;
};

export const useUpdateRole = () => {
    return useMutation({
        mutationFn: updateRole,
        onError: (error) => {
            console.log(error)
        }
    });
};
