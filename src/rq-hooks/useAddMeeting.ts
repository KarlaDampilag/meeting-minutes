
import { QueryService } from '@/app/services/QueryService';
import { QueryClient, useMutation } from '@tanstack/react-query';

export type MutationParams = {
    propertyId: string;
    name: string;
    location: string;
    date: string;
    hours: string | null;
    minutes: string | null;
    agendaTopics: string[];
}

const addMeeting = async (params: MutationParams) => {
    const queryService = QueryService.getInstance();
    const data = await queryService.addMeeting({ propertyId: params.propertyId, name: params.name, location: params.location, date: params.date, hours: params.hours, minutes: params.minutes, agendaTopics: params.agendaTopics});
    return data;
};

const QUERY_KEY = ['Meetings'];

export const useAddMeeting = () => {
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: addMeeting,
        onSuccess: (data) => {
            // invalidate the query cache
            queryClient.invalidateQueries({ queryKey: QUERY_KEY });
        },
        onError: (error) => {
            console.log(error)
        }
    });
};
