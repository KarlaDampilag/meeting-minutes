
'use client'
import React from 'react'
import { Button, Checkbox, CheckboxGroup, cn, DatePicker, Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

import PropertiesDropdown from '../molecules/PropertiesDropdown';
import Text from '../atoms/Text';

import { MeetingWithPropertyAngAgendaItems } from '@/db/schema';
import { getCalendarDateFromDate, getIsMeetingDateUnavailable, onKeyDownPreventPeriodInput, validateNumberPreventNegative } from '@/utils/utils';
import { useUpdateMeeting } from '@/rq-hooks/useUpdateMeeting';
import { useGetMeeting } from '@/rq-hooks/useGetMeeting';
import { useDefaultCheckedAgendaItems, useStartDateFromMeetingByAgendaNameKey, useEndDateFromMeetingByAgendaNameKey } from '@/custom-hooks/customHooks';

const UpdateMeetingAgendaForm = ({ companyId, meeting }: { companyId: string, meeting: MeetingWithPropertyAngAgendaItems }) => {
    const t = useTranslations('Meetings.Agenda Items');
    const { mutate, isPending, isSuccess, isError, reset } = useUpdateMeeting({ meetingId: meeting.id });
    const { refetch } = useGetMeeting({ meetingId: meeting.id, companyId });
    const [propertyId, setPropertyId] = React.useState<string>(meeting.property_id);

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
        const agendaTopics = target.agendaTopics;
        const checkedAgendaTopics: string[] = [];
        agendaTopics.forEach(agendaTopic => {
            if ((agendaTopic as HTMLInputElement).checked) {
                const agendaTopicLocalesKey = (agendaTopic as HTMLInputElement).value;
                if (agendaTopicLocalesKey === "acceptanceOfAnnualFinancialStatements") {
                    if (target.acceptanceOfAnnualFinancialStatementsStartDate.value && target.acceptanceOfAnnualFinancialStatementsEndDate.value) {
                        const startDate = new Date(target.acceptanceOfAnnualFinancialStatementsStartDate.value).toLocaleDateString("de-CH");
                        const endDate = new Date(target.acceptanceOfAnnualFinancialStatementsEndDate.value).toLocaleDateString("de-CH");
                        checkedAgendaTopics.push(t(agendaTopicLocalesKey, { startDate, endDate }));
                    }
                } else if (agendaTopicLocalesKey == "acceptanceOfBudget") {
                    if (target.acceptanceOfBudgetStartDate.value && target.acceptanceOfBudgetEndDate.value) {
                        const startDate = new Date(target.acceptanceOfBudgetStartDate.value).toLocaleDateString("de-CH");
                        const endDate = new Date(target.acceptanceOfBudgetEndDate.value).toLocaleDateString("de-CH");
                        checkedAgendaTopics.push(t(agendaTopicLocalesKey, { startDate, endDate }));
                    }
                } else {
                    checkedAgendaTopics.push(t(agendaTopicLocalesKey));
                }
            }
        });
        const propertyId = target.propertyId.value;
        mutate({ companyId, meetingId: meeting.id, propertyId, name, location, date, hours, minutes, agendaTopics: checkedAgendaTopics });
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

    const checkedAgendaItems = useDefaultCheckedAgendaItems(meeting);
    console.log(checkedAgendaItems)

    console.log(checkedAgendaItems.includes('acceptanceOfAnnualFinancialStatements'))

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
                classNames={{ inputWrapper: 'border border-gray-300' }}
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
                classNames={{ inputWrapper: 'border border-gray-300' }}
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
            <div className='flex flex-col gap-1.5'>
                <CheckboxGroup
                    label="Select Agenda Topics"
                    classNames={{ label: 'text-stone-700' }}
                    defaultValue={checkedAgendaItems}
                >
                    <div className='h-8 flex items-center'>
                        <Checkbox size='sm' className='font-normal' name='agendaTopics' value='welcomingDeterminingQuorum' aria-label='Welcoming and determining the quorum'>
                            <Text localeParent='Meetings.Agenda Items' localeKey='welcomingDeterminingQuorum' />
                        </Checkbox>
                    </div>
                    <div className='h-8 flex items-center'>
                        <Checkbox size='sm' className='font-normal' name='agendaTopics' value='electionOfResponsiblePerson' aria-label='Election of the person responsible for the minutes'>
                            <Text localeParent='Meetings.Agenda Items' localeKey='electionOfResponsiblePerson' />
                        </Checkbox>
                    </div>
                    <div className='h-8 flex items-center'>
                        <Checkbox size='sm' className='font-normal h-10' name='agendaTopics' value='approvalOfLastYearsMinutes' aria-label="Approval of the last year's minutes">
                            <Text localeParent='Meetings.Agenda Items' localeKey='approvalOfLastYearsMinutes' />
                        </Checkbox>
                    </div>
                    <div className='flex items-center gap-1.5 flex-wrap'>
                        <Checkbox size='sm' className='font-normal' name='agendaTopics' value='acceptanceOfAnnualFinancialStatements' aria-label='Acceptance of the annual financial statements'>
                            <Text localeParent='Meetings.Agenda Items' localeKey='acceptanceOfAnnualFinancialStatementsLabel' />
                        </Checkbox>
                        <div className='inline-block'>
                            <DatePicker
                                variant='bordered'
                                radius='sm'
                                size='sm'
                                classNames={{ base: 'datepicker' }}
                                name='acceptanceOfAnnualFinancialStatementsStartDate'
                                aria-label='Start date for Acceptance of the annual financial statements'
                                showMonthAndYearPickers
                                defaultValue={useStartDateFromMeetingByAgendaNameKey(meeting, 'acceptanceOfAnnualFinancialStatements', checkedAgendaItems.includes('acceptanceOfAnnualFinancialStatements'))}
                            />
                        </div>
                        <span>-</span>
                        <div className='inline-block'>
                            <DatePicker
                                variant='bordered'
                                radius='sm'
                                size='sm'
                                classNames={{ base: 'datepicker' }}
                                name='acceptanceOfAnnualFinancialStatementsEndDate'
                                aria-label='End date for Acceptance of the annual financial statements'
                                showMonthAndYearPickers
                                defaultValue={useEndDateFromMeetingByAgendaNameKey(meeting, 'acceptanceOfAnnualFinancialStatements', checkedAgendaItems.includes('acceptanceOfAnnualFinancialStatements'))}
                            />
                        </div>
                    </div>
                    <div className='h-8 flex items-center'>
                        <Checkbox size='sm' className='font-normal h-10' name='agendaTopics' value='renewalFund' aria-label='Renewal fund'>
                            <Text localeParent='Meetings.Agenda Items' localeKey='renewalFund' />
                        </Checkbox>
                    </div>
                    <div className='flex items-center gap-1.5 flex-wrap'>
                        <Checkbox size='sm' className='font-normal' name='agendaTopics' value='acceptanceOfBudget' aria-label='Acceptance of the budget'>
                            <Text localeParent='Meetings.Agenda Items' localeKey='acceptanceOfBudgetLabel' />
                        </Checkbox>
                        <div className='inline-block'>
                            <DatePicker
                                variant='bordered'
                                radius='sm'
                                size='sm'
                                classNames={{ base: 'datepicker' }}
                                name='acceptanceOfBudgetStartDate'
                                aria-label='Start date for Acceptance of the budget'
                                showMonthAndYearPickers
                                defaultValue={useStartDateFromMeetingByAgendaNameKey(meeting, 'acceptanceOfBudget', checkedAgendaItems.includes('acceptanceOfBudget'))}
                            />
                        </div>
                        <span>-</span>
                        <div className='inline-block'>
                            <DatePicker
                                variant='bordered'
                                radius='sm'
                                size='sm'
                                classNames={{ base: 'datepicker' }}
                                name='acceptanceOfBudgetEndDate'
                                aria-label='End date for Acceptance of the budget'
                                showMonthAndYearPickers
                                defaultValue={useEndDateFromMeetingByAgendaNameKey(meeting, 'acceptanceOfBudget', checkedAgendaItems.includes('acceptanceOfBudget'))}
                            />
                        </div>
                    </div>
                    <div className='h-8 flex items-center'>
                        <Checkbox size='sm' className='font-normal h-10' name='agendaTopics' value='miscellaneous' aria-label='Miscellaneous'>
                            <Text localeParent='Meetings.Agenda Items' localeKey='miscellaneous' />
                        </Checkbox>
                    </div>
                </CheckboxGroup>
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