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

export const getAgendaItemHasDates = (key: string) => key === 'acceptanceOfAnnualFinancialStatements' || key === 'acceptanceOfBudget';