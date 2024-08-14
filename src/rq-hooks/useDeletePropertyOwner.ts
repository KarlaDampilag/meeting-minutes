
import { QueryService } from '@/app/services/QueryService';
import { QueryClient, useMutation } from '@tanstack/react-query';

export type MutationParams = {
    propertyOwnerId: string;
    companyId: string;
    propertyId: string;
}

const deletePropertyOwner = async (params: MutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.deletePropertyOwner({ propertyOwnerId: params.propertyOwnerId, companyId: params.companyId, propertyId: params.propertyId });
    return data;
};

export const useDeletePropertyOwner = (params: { propertyOwnerId: string }) => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: deletePropertyOwner,
        onSuccess: (data) => {
            // invalidate the query cache
            queryClient.invalidateQueries({ queryKey: ['PropertyOwners', params.propertyOwnerId], exact: true });
        },
        onError: (error) => {
            console.log(error)
        }
    });
};
