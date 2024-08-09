
import { QueryService } from '@/app/services/QueryService';
import { useMutation } from '@tanstack/react-query';

export type DeleteUserFromCompanyMutationParams = {
    companyId: string | null;
    userId: string | null;
}

const deleteUserFromCompany = async (params: DeleteUserFromCompanyMutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.deleteUserFromCompany(params.companyId as string, params.userId as string);
    return data;
};

export const useDeleteUserFromCompany = () => {
    return useMutation({
        mutationFn: deleteUserFromCompany,
        onError: (error) => {
            console.log(error)
        }
    });
};
