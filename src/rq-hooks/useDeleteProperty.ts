
import { QueryService } from '@/app/services/QueryService';
import { QueryClient, useMutation } from '@tanstack/react-query';

export type MutationParams = {
    companyId: string;
    propertyId: string;
}

const deleteProperty = async (params: MutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.deleteProperty({ propertyId: params.propertyId, companyId: params.companyId });
    return data;
};

export const useDeleteProperty = (params: { propertyId: string }) => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: deleteProperty,
        onSuccess: (data) => {
            // invalidate the query cache
            queryClient.invalidateQueries({ queryKey: ['Properties', params.propertyId], exact: true });
        },
        onError: (error) => {
            console.log(error)
        }
    });
};
