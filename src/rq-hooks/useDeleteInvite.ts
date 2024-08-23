
import { QueryService } from '@/app/services/QueryService';
import { useMutation } from '@tanstack/react-query';

export type MutationParams = {
    inviteId: string | null;
}

const deleteInvite = async (params: MutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.deleteInvite(params.inviteId as string);
    return data;
};

export const useDeleteInvite = () => {
    return useMutation({
        mutationFn: deleteInvite,
        onError: (error) => {
            console.log(error)
        }
    });
};
