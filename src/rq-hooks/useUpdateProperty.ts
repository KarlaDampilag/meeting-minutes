
import { QueryService } from '@/app/services/QueryService';
import { QueryClient, useMutation } from '@tanstack/react-query';

export type MutationParams = {
    companyId: string;
    propertyId: string;
    propertyName: string;
    street: string | null;
    city: string | null;
    zipCode: string | null;
    country: string | null;
    propertyManagerId: string;
    totalOwnershipShares: string | null;
}

const updateProperty = async (params: MutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.updateProperty({ companyId: params.companyId, propertyId: params.propertyId, propertyName: params.propertyName, street: params.street, city: params.city, zipCode: params.zipCode, country: params.country, propertyManagerId: params.propertyManagerId, totalOwnershipShares: params.totalOwnershipShares });
    return data;
};


export const useUpdateProperty = (params: { propertyId: string }) => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: updateProperty,
        onSuccess: (data) => {
            // invalidate the query cache
            queryClient.invalidateQueries({ queryKey: ['Property', params.propertyId], exact: true });
        },
        onError: (error) => {
            console.log(error)
        }
    });
};
