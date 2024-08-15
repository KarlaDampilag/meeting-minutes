
import { QueryService } from '@/app/services/QueryService';
import { QueryClient, useMutation } from '@tanstack/react-query';

export type MutationParams = {
    supplierId: string;
    companyId: string;
    propertyId: string;
    name: string;
    service: string;
    telephone: string | null;
    email: string | null;
}

const updateSupplier = async (params: MutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.updateSupplier({ supplierId: params.supplierId, companyId: params.companyId, propertyId: params.propertyId, name: params.name, service: params.service, telephone: params.telephone, email: params.email });
    return data;
};

export const useUpdateSupplier = (params: { supplierId: string }) => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: updateSupplier,
        onSuccess: (data) => {
            // invalidate the query cache
            queryClient.invalidateQueries({ queryKey: ['Suppliers', params.supplierId], exact: true });
        },
        onError: (error) => {
            console.log(error)
        }
    });
};
