import { QueryService } from "@/app/services/QueryService";
import { PropertyWithManager } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

type QueryParams = {
    companyId: string | undefined | null;
    propertyManagerId: string | undefined | null;
    searchTerm: string | undefined | null;
}

const getProperties = async (params: QueryParams): Promise<PropertyWithManager[]> => {
    const queryService = QueryService.getInstance();
    if (params.propertyManagerId === 'all') {
        return await queryService.fetchProperties(params.companyId as string, params.searchTerm);
    } else {
        return await queryService.fetchPropertiesByPropertyManager(params.propertyManagerId as string, params.searchTerm);
    }
};

export const useGetProperties = (params: QueryParams) => {
    return useQuery<PropertyWithManager[], Error>({
        queryKey: ['Properties', { propertyManagerId: params.propertyManagerId, searchTerm: params.searchTerm }],
        queryFn: () => getProperties(params),
        enabled: !!params.companyId && !!params.propertyManagerId
    });
};