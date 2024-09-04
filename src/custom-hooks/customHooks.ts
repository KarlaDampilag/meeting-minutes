import { useTranslations } from 'next-intl';

import { MeetingWithPropertyAngAgendaItems } from '@/db/schema';
import { getCalendarDateFromDate } from '@/utils/utils';

export const useDefaultCheckedAgendaItems = (meeting: MeetingWithPropertyAngAgendaItems): string[] => {
    const t = useTranslations('Meetings.Agenda Items');

    const agendaItemNameKeys = [
        "welcomingDeterminingQuorum",
        "electionOfResponsiblePerson",
        "approvalOfLastYearsMinutes",
        "acceptanceOfAnnualFinancialStatementsLabel",
        "renewalFund",
        "acceptanceOfBudgetLabel",
        "miscellaneous"
    ];

    const checkedAgendaItemsNameKeys: string[] = [];

    for (let i = 0; i < agendaItemNameKeys.length; i++) {
        const agendaItemNameKey = agendaItemNameKeys[i];
        const agendaItemName = t(agendaItemNameKey);

        const meetingHasAgendaItem = meeting.agendaItems.some(agendaItem => agendaItem.name.includes(agendaItemName));
        if (meetingHasAgendaItem) {
            if (agendaItemNameKey === "acceptanceOfAnnualFinancialStatementsLabel") {
                checkedAgendaItemsNameKeys.push("acceptanceOfAnnualFinancialStatements");
            } else if (agendaItemNameKey === "acceptanceOfBudgetLabel") {
                checkedAgendaItemsNameKeys.push("acceptanceOfBudget");
            } else {
                checkedAgendaItemsNameKeys.push(agendaItemNameKey);
            }
        }
    }

    return checkedAgendaItemsNameKeys;
};

export const useStartDateFromMeetingByAgendaNameKey = (meeting: MeetingWithPropertyAngAgendaItems, agendaItemNameKey: string, execute: boolean) => {
    const t = useTranslations('Meetings.Agenda Items');

    if (!execute) {
        return undefined;
    }

    let agendaItemName: string;
    
    if (agendaItemNameKey === "acceptanceOfAnnualFinancialStatements") {
        agendaItemName = t('acceptanceOfAnnualFinancialStatementsLabel');
    } else if (agendaItemNameKey === "acceptanceOfBudget") {
        agendaItemName = t('acceptanceOfBudgetLabel');
    } else {
        agendaItemName = t(agendaItemNameKey);
    }

    const agendaItemFromMeeting = meeting.agendaItems.find(agendaItem => agendaItem.name.includes(agendaItemName));

    if (agendaItemFromMeeting) {
        // Regular expression to match a date in the format "d.m.yyyy"
        const dateRegex = /\b\d{1,2}\.\d{1,2}\.\d{4}\b/;
    
        // Find the first match in the string
        const matches = agendaItemFromMeeting.name.match(dateRegex);
    
        // Return the first matched date string or undefined if no match found
        if (matches) {
            const dateString = matches[0];
            const [day, month, year] = dateString.split('.').map(Number);
            const date = new Date(year, month - 1, day);
            return getCalendarDateFromDate(date);
        }
        return undefined;
    } else {
        return undefined;
    }
}

export const useEndDateFromMeetingByAgendaNameKey = (meeting: MeetingWithPropertyAngAgendaItems, agendaItemNameKey: string, execute: boolean) => {
    const t = useTranslations('Meetings.Agenda Items');

    if (!execute) {
        return undefined;
    }

    let agendaItemName: string;
    
    if (agendaItemNameKey === "acceptanceOfAnnualFinancialStatements") {
        agendaItemName = t('acceptanceOfAnnualFinancialStatementsLabel');
    } else if (agendaItemNameKey === "acceptanceOfBudget") {
        agendaItemName = t('acceptanceOfBudgetLabel');
    } else {
        agendaItemName = t(agendaItemNameKey);
    }

    const agendaItemFromMeeting = meeting.agendaItems.find(agendaItem => agendaItem.name.includes(agendaItemName));

    if (agendaItemFromMeeting) {
        // Regular expression to match a date in the format "d.m.yyyy"
        const dateRegex = /\b\d{1,2}\.\d{1,2}\.\d{4}\b/g;
    
        // Find all matches in the string
        const matches = agendaItemFromMeeting.name.match(dateRegex);
    
        // Return the 2nd matched date string or undefined if no match found
        if (matches && matches.length === 2) {
            const dateString = matches[1];
            const [day, month, year] = dateString.split('.').map(Number);
            const date = new Date(year, month - 1, day);
            return getCalendarDateFromDate(date);
        }
        return undefined;
    } else {
        return undefined;
    }
}