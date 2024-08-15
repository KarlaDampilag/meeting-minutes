
import { QueryService } from '@/app/services/QueryService';
import { QueryClient, useMutation } from '@tanstack/react-query';

export type MutationParams = {
    supplierId: string;
    companyId: string;
    propertyId: string;
}

const deleteSupplier = async (params: MutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.deleteSupplier({ supplierId: params.supplierId, companyId: params.companyId, propertyId: params.propertyId });
    return data;
};

export const useDeleteSupplier = (params: { supplierId: string }) => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: deleteSupplier,
        onSuccess: (data) => {
            // invalidate the query cache
            queryClient.invalidateQueries({ queryKey: ['Suppliers', params.supplierId], exact: true });
        },
        onError: (error) => {
            console.log(error)
        }
    });
};
