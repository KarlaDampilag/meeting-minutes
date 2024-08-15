
import { QueryService } from '@/app/services/QueryService';
import { QueryClient, useMutation } from '@tanstack/react-query';

export type MutationParams = {
    companyId: string;
    propertyId: string;
    name: string;
    service: string;
    telephone: string | null;
    email: string | null;
}

const addSupplier = async (params: MutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.addSupplier({ companyId: params.companyId, propertyId: params.propertyId, name: params.name, service: params.service, telephone: params.telephone, email: params.email });
    return data;
};

const QUERY_KEY = ['Suppliers'];

export const useAddSupplier = () => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: addSupplier,
        onSuccess: (data) => {
            // invalidate the query cache
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
        onError: (error) => {
            console.log(error)
        }
    });
};
