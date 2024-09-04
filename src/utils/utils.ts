import { DateValue } from '@nextui-org/react';
import { now, getLocalTimeZone, CalendarDate, CalendarDateTime } from "@internationalized/date";
import { ValidationError } from '@react-types/shared';
import { MeetingWithPropertyAngAgendaItems } from '@/db/schema';
import { useTranslations } from 'next-intl';

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}


export const onKeyDownPreventPeriodInput = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === '.' || ev.key === ',' || ev.key === ' ') {
        ev.preventDefault();
    }
}


export const validateNumberPreventNegative = (value: string): true | ValidationError | null | undefined => {
    return parseInt(value) >= 0 || "Please enter a valid number";
}

export const getIsMeetingDateUnavailable = (date: DateValue) => {
    const today = now(getLocalTimeZone());
    return date.compare(today) < 0;
}

export const getCalendarDateFromDate = (date: Date, options?: { includeTime?: boolean }): CalendarDate | CalendarDateTime => {
    const utcDate = new Date(date);

    // Extract the local time components
    const localYear = utcDate.getFullYear();
    const localMonth = utcDate.getMonth() + 1; // getMonth() returns 0-11, so add 1
    const localDay = utcDate.getDate();
    const localHours = utcDate.getHours();
    const localMinutes = utcDate.getMinutes();
    const localSeconds = utcDate.getSeconds();

    if (options?.includeTime) {
        // Create the CalendarDateTime object using local time
        const calendarDateTime = new CalendarDateTime(localYear, localMonth, localDay, localHours, localMinutes, localSeconds);
        return calendarDateTime;
    } else {
        const calendarDate = new CalendarDate(localYear, localMonth, localDay);
        return calendarDate;
    }
}

export const getDefaultCheckedAgendaItems = (meeting: MeetingWithPropertyAngAgendaItems): string[] => {
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
}

export const getStartDateFromMeetingByAgendaNameKey = (meeting: MeetingWithPropertyAngAgendaItems, agendaItemNameKey: string) => {
    const t = useTranslations('Meetings.Agenda Items');
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

export const getEndDateFromMeetingByAgendaNameKey = (meeting: MeetingWithPropertyAngAgendaItems, agendaItemNameKey: string) => {
    const t = useTranslations('Meetings.Agenda Items');
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