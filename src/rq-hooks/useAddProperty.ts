
import { QueryService } from '@/app/services/QueryService';
import { QueryClient, useMutation } from '@tanstack/react-query';

export type MutationParams = {
    companyId: string;
    propertyName: string;
    street: string | null;
    city: string | null;
    zipCode: string | null;
    country: string | null;
    propertyManagerId: string;
    totalOwnershipShares: string | null;
}

const addProperty = async (params: MutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.addProperty({ companyId: params.companyId, propertyName: params.propertyName, street: params.street, city: params.city, zipCode: params.zipCode, country: params.country, propertyManagerId: params.propertyManagerId, totalOwnershipShares: params.totalOwnershipShares });
    return data;
};

const QUERY_KEY = ['Properties'];

export const useAddProperty = () => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: addProperty,
        onSuccess: (data) => {
            // invalidate the query cache
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
        onError: (error) => {
            console.log(error)
        }
    });
};
