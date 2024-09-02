import { QueryService } from "@/app/services/QueryService";
import { MeetingWithPropertyAngAgendaItems } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

type QueryParams = {
    companyId: string | undefined | null;
    meetingId: string | undefined | null;
}

const getMeeting = async (params: QueryParams): Promise<MeetingWithPropertyAngAgendaItems> => {
    const queryService = QueryService.getInstance();
    const result = await queryService.fetchMeeting(params.companyId as string, params.meetingId as string);
    return result;
};

export const useGetMeeting = (params: QueryParams) => {
    return useQuery<MeetingWithPropertyAngAgendaItems, Error>({
        queryKey: ['Meeting', params.meetingId],
        queryFn: () => getMeeting(params),
        enabled: !!params.companyId && !!params.meetingId
    });
};