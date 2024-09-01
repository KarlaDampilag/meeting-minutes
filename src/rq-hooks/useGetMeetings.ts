import { QueryService } from "@/app/services/QueryService";
import { MeetingWithProperty } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

type QueryParams = {
    companyId: string | undefined | null;
    propertyId: string | undefined | null;
    searchTerm: string | undefined | null;
}

const getMeetings = async (params: QueryParams): Promise<MeetingWithProperty[]> => {
    const queryService = QueryService.getInstance();
    if (params.propertyId === 'all') {
        return await queryService.fetchMeetings(params.companyId as string, params.searchTerm);
    } else {
        return await queryService.fetchMeetingsByProperty(params.propertyId as string, params.searchTerm);
    }
};

export const useGetMeetings = (params: QueryParams) => {
    return useQuery<MeetingWithProperty[], Error>({
        queryKey: ['Meetings', { propertyId: params.propertyId, searchTerm: params.searchTerm }],
        queryFn: () => getMeetings(params),
        enabled: !!params.companyId && !!params.propertyId
    });
};