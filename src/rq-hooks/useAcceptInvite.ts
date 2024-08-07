
import { QueryService } from '@/app/services/QueryService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type AcceptInviteMutationParams = {
    inviteId: string | null;
}

const acceptInvite = async (params: AcceptInviteMutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.acceptInvite(params.inviteId as string);
    return data;
};

const QUERY_KEY = ['Invites', 'Users'];

export const useAcceptInvite = (params: AcceptInviteMutationParams) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: acceptInvite,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: QUERY_KEY,
                refetchType: 'active',
            });
        },
        onError: (error) => {
            console.log(error)
        }
    });
};
