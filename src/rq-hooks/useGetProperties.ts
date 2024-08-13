import { QueryService } from "@/app/services/QueryService";
import { PropertyWithManager } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

type QueryParams = {
    companyId: string | undefined | null;
}

const QUERY_KEY = ['Properties'];

const getProperties = async (params: QueryParams): Promise<PropertyWithManager[]> => {
    const queryService = QueryService.getInstance();
    const result = await queryService.fetchProperties(params.companyId as string);
    return result;
};

export const useGetProperties = (params: QueryParams) => {
    return useQuery<PropertyWithManager[], Error>({
        queryKey: QUERY_KEY,
        queryFn: () => getProperties(params),
        enabled: !!params.companyId
    });
};