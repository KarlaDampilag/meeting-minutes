
import { QueryService } from '@/app/services/QueryService';
import { QueryClient, useMutation } from '@tanstack/react-query';

export type MutationParams = {
    companyId: string;
    meetingId: string;
}

const deleteMeeting = async (params: MutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.deleteMeeting({ meetingId: params.meetingId, companyId: params.companyId });
    return data;
};

export const useDeleteMeeting = (params: { meetingId: string }) => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: deleteMeeting,
        onSuccess: (data) => {
            // invalidate the query cache
            queryClient.invalidateQueries({ queryKey: ['Meetings', params.meetingId], exact: true });
        },
        onError: (error) => {
            console.log(error)
        }
    });
};
