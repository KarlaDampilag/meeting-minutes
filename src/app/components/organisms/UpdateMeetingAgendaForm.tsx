
'use client'
import React from 'react'
import { Button, cn, DatePicker, Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

import PropertiesDropdown from '../molecules/PropertiesDropdown';
import Text from '../atoms/Text';

import { MeetingWithPropertyAngAgendaItems } from '@/db/schema';
import { getCalendarDateFromDate, getIsMeetingDateUnavailable, onKeyDownPreventPeriodInput, validateNumberPreventNegative } from '@/utils/utils';
import { useUpdateMeeting } from '@/rq-hooks/useUpdateMeeting';
import { useGetMeeting } from '@/rq-hooks/useGetMeeting';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

const UpdateMeetingAgendaForm = ({ companyId, meeting }: { companyId: string, meeting: MeetingWithPropertyAngAgendaItems }) => {
    const t = useTranslations('Meetings.Agenda Items');
    const { mutate, isPending, isSuccess, isError, reset } = useUpdateMeeting({ meetingId: meeting.id });
    const { refetch } = useGetMeeting({ meetingId: meeting.id, companyId });
    const [propertyId, setPropertyId] = React.useState<string>(meeting.property_id);
    const [agendaItems, setAgendaItems] = React.useState<string[]>(meeting.agendaItems.map(item => item.name));

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            name: { value: string };
            location: { value: string };
            date: { value: string };
            hours: { value: string | null };
            minutes: { value: string | null };
            agendaTopics: RadioNodeList;
            propertyId: { value: string };
            acceptanceOfAnnualFinancialStatementsStartDate: { value: string | null };
            acceptanceOfAnnualFinancialStatementsEndDate: { value: string | null };
            acceptanceOfBudgetStartDate: { value: string | null };
            acceptanceOfBudgetEndDate: { value: string | null };
        };
        const name = target.name.value;
        const location = target.location.value;
        const date = target.date.value;
        const hours = target.hours.value;
        const minutes = target.minutes.value;  
        const propertyId = target.propertyId.value;
        mutate({ companyId, meetingId: meeting.id, propertyId, name, location, date, hours, minutes, agendaTopics: agendaItems });
    }

    if (isSuccess) {
        toast.success(<Text localeParent='Common' localeKey='Successfully updated' />, { toastId: "update-meeting" });
        reset();
        refetch();
    }

    if (isError) {
        toast.error("Something went wrong, please contact support", { toastId: "update-meeting-error" });
    }

    const calendarDateTime = getCalendarDateFromDate(meeting.date, { includeTime: true });

    const [hours, minutes, seconds] = meeting.duration.split(":").map(String);

    const moveItemUp = (index: number) => {
        if (index === 0) return; // Already at the top
        const updatedItems = [...agendaItems];
        [updatedItems[index - 1], updatedItems[index]] = [updatedItems[index], updatedItems[index - 1]];
        setAgendaItems(updatedItems);
    };

    const moveItemDown = (index: number) => {
        if (index === agendaItems.length - 1) return; // Already at the bottom
        const updatedItems = [...agendaItems];
        [updatedItems[index + 1], updatedItems[index]] = [updatedItems[index], updatedItems[index + 1]];
        setAgendaItems(updatedItems);
    };

    return (
        <form onSubmit={handleFormSubmit} className='flex flex-col gap-6'>
            <Input
                variant='bordered'
                label="Agenda name"
                placeholder="XYZ meeting agenda"
                type='text'
                name='name'
                isRequired
                labelPlacement='outside'
                radius='sm'
                classNames={{ inputWrapper: 'border border-gray-300', base: 'max-w-lg' }}
                validationBehavior='native'
                defaultValue={meeting.name}
            />
            <Input
                variant='bordered'
                label="Location"
                placeholder="Raum Nr. 5 Rue du Liseron 7, 1006 Lausanne"
                type='text'
                name='location'
                isRequired
                labelPlacement='outside'
                radius='sm'
                classNames={{ inputWrapper: 'border border-gray-300', base: 'max-w-lg' }}
                validationBehavior='native'
                defaultValue={meeting.location}
            />
            <div className='flex items-center gap-6'>
                <DatePicker
                    variant="bordered"
                    label="Date"
                    name="date"
                    isRequired
                    labelPlacement='outside'
                    radius='sm'
                    classNames={{ base: 'max-w-64 datepicker' }}
                    hideTimeZone
                    showMonthAndYearPickers
                    defaultValue={calendarDateTime}
                    validationBehavior='native'
                    isDateUnavailable={getIsMeetingDateUnavailable}
                />
                <div>
                    <p className='mb-1.5 text-sm'>Duration<span className='text-danger-500'>*</span></p>
                    <div className='flex items-end gap-2 max-w-72'>
                        <Input
                            variant='bordered'
                            aria-label="hours"
                            placeholder="0"
                            type='number'
                            name='hours'
                            isRequired
                            labelPlacement='outside'
                            radius='sm'
                            classNames={{ inputWrapper: 'border border-gray-300' }}
                            onKeyDown={onKeyDownPreventPeriodInput}
                            endContent="hours"
                            validationBehavior='native'
                            validate={validateNumberPreventNegative}
                            defaultValue={hours}
                        />
                        <Input
                            variant='bordered'
                            aria-label="minutes"
                            placeholder="0"
                            type='number'
                            name='minutes'
                            isRequired
                            labelPlacement='outside'
                            radius='sm'
                            classNames={{ inputWrapper: 'border border-gray-300' }}
                            onKeyDown={onKeyDownPreventPeriodInput}
                            endContent="minutes"
                            validationBehavior='native'
                            validate={validateNumberPreventNegative}
                            defaultValue={minutes}
                        />
                    </div>
                </div>
            </div>
            <PropertiesDropdown companyId={companyId} selectedId={propertyId} onChange={setPropertyId} labelPlacement='outside' className='' />
            <hr className='mt-3' />
            <div className='flex flex-col gap-6'>
                <label><Text localeParent='Meetings' localeKey='Agenda Topics' /></label>
                {agendaItems.map((item, index) => {
                    return (
                        <div className='flex items-center gap-3' key={item}>
                            <div className='flex items-center gap-1 w-fit'>
                                <span onClick={() => moveItemUp(index)} className={cn('border px-2 py-1.5 rounded-md', { 'cursor-pointer': index > 0, 'cursor-not-allowed': index === 0 })}>
                                    <IoChevronUp />
                                </span>
                                <span onClick={() => moveItemDown(index)} className={cn('border px-2 py-1.5 rounded-md', { 'cursor-pointer': index < agendaItems.length - 1, 'cursor-not-allowed': index === agendaItems.length - 1 })}>
                                    <IoChevronDown />
                                </span>
                            </div>
                            <div className='agenda-topic-input-row w-full max-w-lg'>
                                <Input
                                    variant='bordered'
                                    aria-label=""
                                    type='text'
                                    name={`agendaItem-${index + 1}`}
                                    isRequired
                                    labelPlacement='outside'
                                    radius='sm'
                                    classNames={{ inputWrapper: 'border border-gray-300' }}
                                    fullWidth
                                    validationBehavior='native'
                                    value={item}
                                    onChange={(e) => {
                                        const updatedItems = [...agendaItems];
                                        (updatedItems as any)[index] = e.target.value;  // Update agendaItems state
                                        setAgendaItems(updatedItems);
                                    }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className='flex justify-start items-center gap-2'>
                <Button type='submit' color={isPending ? "default" : "primary"} isLoading={isPending} isDisabled={isPending} className={cn({ "cursor-not-allowed": isPending })} radius='sm'>
                    Update Meeting Agenda
                </Button>
            </div>
        </form>
    )
}

export default UpdateMeetingAgendaForm