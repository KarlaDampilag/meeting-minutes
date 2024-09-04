import { QueryService } from "@/app/services/QueryService";
import { User } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

type QueryParams = {
    userId: string | undefined | null;
}


const getUser = async (params: QueryParams): Promise<User> => {
    const queryService = QueryService.getInstance();
    const result = await queryService.fetchUser(params.userId as string);
    return result;
};

export const useGetUser = (params: QueryParams) => {
    return useQuery<User, Error>({
        queryKey: ['User', params.userId],
        queryFn: () => getUser(params),
        enabled: !!params.userId
    });
};