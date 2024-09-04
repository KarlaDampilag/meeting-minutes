
import { QueryService } from '@/app/services/QueryService';
import { QueryClient, useMutation } from '@tanstack/react-query';

export type MutationParams = {
    companyId: string;
    meetingId: string;
    propertyId: string;
    name: string;
    location: string;
    date: string;
    hours: string | null;
    minutes: string | null;
    agendaTopics: string[];
}

const updateMeeting = async (params: MutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.updateMeeting({ companyId: params.companyId, meetingId: params.meetingId, propertyId: params.propertyId, name: params.name, location: params.location, date: params.date, hours: params.hours, minutes: params.minutes, agendaTopics: params.agendaTopics });
    return data;
};


export const useUpdateMeeting = (params: { meetingId: string }) => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: updateMeeting,
        onSuccess: (data) => {
            // invalidate the query cache
            queryClient.invalidateQueries({ queryKey: ['Meeting', params.meetingId], exact: true });
        },
        onError: (error) => {
            console.log(error)
        }
    });
};
