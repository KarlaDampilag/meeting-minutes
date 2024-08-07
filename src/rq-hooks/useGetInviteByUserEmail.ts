import { QueryService } from "@/app/services/QueryService";
import { Invite } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

type GetUsersQueryParams = {
    email: string | undefined | null;
}

const QUERY_KEY = ['Invites'];

const getInviteByUserEmail = async (params: GetUsersQueryParams): Promise<Invite[]> => {
    const queryService = QueryService.getInstance();
    const result = await queryService.fetchOpenInvites(params.email as string);
    return result;
};

export const useGetInviteByUserEmail = (params: GetUsersQueryParams) => {
    return useQuery<Invite[], Error>({
        queryKey: QUERY_KEY,
        queryFn: () => getInviteByUserEmail(params),
        enabled: !!params.email
    });
};