'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, cn, Input, DatePicker, Checkbox, DateValue, CheckboxGroup } from "@nextui-org/react";
import { now, getLocalTimeZone } from "@internationalized/date";
import { toast } from 'react-toastify';

import Text from '../atoms/Text';
import PropertiesDropdown from './PropertiesDropdown';
import { onKeyDownPreventPeriodInput, validateNumberPreventNegative } from '@/utils/utils';
import { useTranslations } from 'next-intl';

interface Props {
    companyId: string;
    isPending: boolean;
    isOpen: boolean;
    onAddMeeting: (propertyId: string, name: string, location: string, date: string, hours: string | null, minutes: string | null, agendaTopics: string[]) => void;
    onClose: () => void;
    onOpenChange: () => void;
}

const AddAgendaModal = ({ companyId, isPending, isOpen, onAddMeeting, onClose, onOpenChange }: Props) => {
    const today = now(getLocalTimeZone());
    const t = useTranslations('Meetings.Agenda Items');
    const [propertyId, setPropertyId] = React.useState<string>();

    const getIsDateUnavailable = (date: DateValue) => {
        return date.compare(today) < 0;
    }

    const handleModalClose = () => {
        setPropertyId(undefined);
        onClose();
    }

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        toast.info("Please wait...");
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
                if (agendaTopicLocalesKey === "acceptanceOfAnnualFinancialStatements" && target.acceptanceOfAnnualFinancialStatementsStartDate.value && target.acceptanceOfAnnualFinancialStatementsEndDate.value) {
                    const startDate = new Date(target.acceptanceOfAnnualFinancialStatementsStartDate.value).toLocaleDateString("de-CH");
                    const endDate = new Date(target.acceptanceOfAnnualFinancialStatementsEndDate.value).toLocaleDateString("de-CH");
                    checkedAgendaTopics.push(t(agendaTopicLocalesKey, { startDate, endDate }));
                } else if (agendaTopicLocalesKey == "acceptanceOfBudget" && target.acceptanceOfBudgetStartDate.value && target.acceptanceOfBudgetEndDate.value) {
                    const startDate = new Date(target.acceptanceOfBudgetStartDate.value).toLocaleDateString("de-CH");
                    const endDate = new Date(target.acceptanceOfBudgetEndDate.value).toLocaleDateString("de-CH");
                    checkedAgendaTopics.push(t(agendaTopicLocalesKey, { startDate, endDate }));
                } else {
                    checkedAgendaTopics.push(t(agendaTopicLocalesKey));
                }
            }
        });
        const propertyId = target.propertyId.value;
        onAddMeeting(propertyId, name, location, date, hours, minutes, checkedAgendaTopics);
    }



    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={handleModalClose}
            placement="top-center"
            size='3xl'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 pb-3">Create Meeting Agenda</ModalHeader>
                        <ModalBody className='gap-7 pb-5'>
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
                                        defaultValue={today}
                                        validationBehavior='native'
                                        isDateUnavailable={getIsDateUnavailable}
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
                                    <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                                        <Text localeParent="Common" localeKey="Close" />
                                    </Button>
                                    <Button type='submit' color={isPending ? "default" : "primary"} isLoading={isPending} isDisabled={isPending} className={cn({ "cursor-not-allowed": isPending })} radius='sm'>
                                        Create Meeting Agenda
                                    </Button>
                                </div>
                            </form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default AddAgendaModal