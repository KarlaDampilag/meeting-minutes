import { QueryService } from "@/app/services/QueryService";
import { Owner } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

type QueryParams = {
    companyId: string | undefined | null;
    propertyId: string | undefined | null;
}

const QUERY_KEY = ['PropertyOwners'];

const getPropertyOwners = async (params: QueryParams): Promise<Owner[]> => {
    const queryService = QueryService.getInstance();
    const result = await queryService.fetchPropertyOwners(params.companyId as string, params.propertyId as string);
    return result;
};

export const useGetPropertyOwners = (params: QueryParams) => {
    return useQuery<Owner[], Error>({
        queryKey: QUERY_KEY,
        queryFn: () => getPropertyOwners(params),
        enabled: !!params.companyId
    });
};