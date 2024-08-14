
import { QueryService } from '@/app/services/QueryService';
import { QueryClient, useMutation } from '@tanstack/react-query';

export type MutationParams = {
    companyId: string;
    propertyId: string;
    firstName: string;
    lastName: string;
    telephone: string | null;
    email: string | null;
    ownershipPercentage: number | null;
}

const addPropertyOwner = async (params: MutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.addPropertyOwner({ companyId: params.companyId, propertyId: params.propertyId, firstName: params.firstName, lastName: params.lastName, telephone: params.telephone, email: params.email, ownershipPercentage: params.ownershipPercentage });
    return data;
};

const QUERY_KEY = ['PropertyOwners'];

export const useAddPropertyOwner = () => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: addPropertyOwner,
        onSuccess: (data) => {
            // invalidate the query cache
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
        onError: (error) => {
            console.log(error)
        }
    });
};
