import { QueryService } from "@/app/services/QueryService";
import { User } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

type GetUsersQueryParams = {
    companyId: string | undefined | null;
}

const QUERY_KEY = ['Users'];

const getUsers = async (params: GetUsersQueryParams): Promise<User[]> => {
    const queryService = QueryService.getInstance();
    const result = await queryService.fetchUsers(params.companyId as string);
    return result;
};

export const useGetUsers = (params: GetUsersQueryParams) => {
    return useQuery<User[], Error>({
        queryKey: QUERY_KEY,
        queryFn: () => getUsers(params),
        enabled: !!params.companyId
    });
};