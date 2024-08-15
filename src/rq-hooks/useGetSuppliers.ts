import { QueryService } from "@/app/services/QueryService";
import { Supplier } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

type QueryParams = {
    companyId: string | undefined | null;
    propertyId: string | undefined | null;
}

const QUERY_KEY = ['Suppliers'];

const getSuppliers = async (params: QueryParams): Promise<Supplier[]> => {
    const queryService = QueryService.getInstance();
    const result = await queryService.fetchSuppliers(params.companyId as string, params.propertyId as string);
    return result;
};

export const useGetSuppliers = (params: QueryParams) => {
    return useQuery<Supplier[], Error>({
        queryKey: QUERY_KEY,
        queryFn: () => getSuppliers(params),
        enabled: !!params.companyId && !!params.propertyId
    });
};