import { QueryService } from "@/app/services/QueryService";
import { Invite } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

type GetUsersQueryParams = {
    companyId: string | undefined | null;
}

const QUERY_KEY = ['Invites'];

const getOpenInvites = async (params: GetUsersQueryParams): Promise<Invite[]> => {
    const queryService = QueryService.getInstance();
    const result = await queryService.fetchOpenInvites(params.companyId as string);
    return result;
};

export const useGetOpenInvites = (params: GetUsersQueryParams) => {
    return useQuery<Invite[], Error>({
        queryKey: QUERY_KEY,
        queryFn: () => getOpenInvites(params),
        enabled: !!params.companyId
    });
};