import { QueryService } from "@/app/services/QueryService";
import { User } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

type QueryParams = {
    companyId: string | undefined | null;
}

const QUERY_KEY = ['PropertyManagers'];

const getPropertyManagers = async (params: QueryParams): Promise<User[]> => {
    const queryService = QueryService.getInstance();
    const result = await queryService.fetchPropertyManagers(params.companyId as string);
    return result;
};

export const useGetPropertyManagers = (params: QueryParams) => {
    return useQuery<User[], Error>({
        queryKey: QUERY_KEY,
        queryFn: () => getPropertyManagers(params),
        enabled: !!params.companyId
    });
};