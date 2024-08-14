import { QueryService } from "@/app/services/QueryService";
import { PropertyWithManager } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

type QueryParams = {
    companyId: string | undefined | null;
    propertyId: string | undefined | null;
}

const getProperty = async (params: QueryParams): Promise<PropertyWithManager> => {
    const queryService = QueryService.getInstance();
    const result = await queryService.fetchProperty(params.companyId as string, params.propertyId as string);
    return result;
};

export const useGetProperty = (params: QueryParams) => {
    return useQuery<PropertyWithManager, Error>({
        queryKey: ['Property', params.propertyId],
        queryFn: () => getProperty(params),
        enabled: !!params.companyId && !!params.propertyId
    });
};