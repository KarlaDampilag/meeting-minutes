
import { QueryService } from '@/app/services/QueryService';
import { QueryClient, useMutation } from '@tanstack/react-query';

export type MutationParams = {
    propertyOwnerId: string;
    companyId: string;
    propertyId: string;
    firstName: string;
    lastName: string;
    telephone: string | null;
    email: string | null;
    ownedParts: number | null;
    street: string | null;
    city: string | null;
    zipCode: string | null;
    country: string | null;
}

const updatePropertyOwner = async (params: MutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.updatePropertyOwner({
        propertyOwnerId: params.propertyOwnerId,
        companyId: params.companyId,
        propertyId: params.propertyId,
        firstName: params.firstName,
        lastName: params.lastName,
        telephone: params.telephone,
        email: params.email,
        ownedParts: params.ownedParts,
        street: params.street,
        city: params.city,
        zipCode: params.zipCode,
        country: params.country
    });
    return data;
};

export const useUpdatePropertyOwner = (params: { propertyOwnerId: string }) => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: updatePropertyOwner,
        onSuccess: (data) => {
            // invalidate the query cache
            queryClient.invalidateQueries({ queryKey: ['PropertyOwners', params.propertyOwnerId], exact: true });
        },
        onError: (error) => {
            console.log(error)
        }
    });
};
