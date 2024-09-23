'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, Button, cn, Input, DatePicker } from "@nextui-org/react";
import { now, today, getLocalTimeZone } from "@internationalized/date";
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';
import { IoAdd, IoChevronDown, IoChevronUp } from 'react-icons/io5';

import Text from '../atoms/Text';
import PropertiesDropdown from './PropertiesDropdown';

import { getIsMeetingDateUnavailable, onKeyDownPreventPeriodInput, validateNumberPreventNegative } from '@/utils/utils';
import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
    companyId: string;
    isPending: boolean;
    isOpen: boolean;
    onAddMeeting: (propertyId: string, name: string, location: string, date: string, hours: string | null, minutes: string | null, agendaTopics: string[]) => void;
    onClose: () => void;
    onOpenChange: () => void;
}

const AddAgendaModal = ({ companyId, isPending, isOpen, onAddMeeting, onClose, onOpenChange }: Props) => {
    const todayWithTime = now(getLocalTimeZone());
    const todayDate = today(getLocalTimeZone());
    const firstDayPreviousYear = todayDate.copy().subtract({ years: 1 }).set({ day: 1, month: 1 });
    const lastDayPreviousYear = todayDate.copy().subtract({ years: 1 }).set({ day: 31, month: 12 });
    const firstDayCurrentYear = todayDate.copy().set({ day: 1, month: 1 });
    const lastDayCurrentYear = todayDate.copy().set({ day: 31, month: 12 });
    const t = useTranslations('Meetings.Agenda Items');

    console.log(todayWithTime)

    const getDefaultTopicValue = (key: string) => {
        switch (key) {
            case 'acceptanceOfAnnualFinancialStatements':
                return t(key, { startDate: new Date(firstDayPreviousYear.toString()).toLocaleDateString("de-CH"), endDate: new Date(lastDayPreviousYear.toString()).toLocaleDateString("de-CH") });
            case 'acceptanceOfBudget':
                return t(key, { startDate: new Date(firstDayCurrentYear.toString()).toLocaleDateString("de-CH"), endDate: new Date(lastDayCurrentYear.toString()).toLocaleDateString("de-CH") })
            default:
                return t(key);
        }
    };

    const defaultAgendaItems = [
        getDefaultTopicValue("welcomingDeterminingQuorum"),
        getDefaultTopicValue("electionOfResponsiblePerson"),
        getDefaultTopicValue("approvalOfLastYearsMinutes"),
        getDefaultTopicValue("acceptanceOfAnnualFinancialStatements"),
        getDefaultTopicValue("renewalFund"),
        getDefaultTopicValue("acceptanceOfBudget"),
        getDefaultTopicValue("miscellaneous"),
    ];
    const [agendaItems, setAgendaItems] = React.useState<string[]>(defaultAgendaItems);
    const [propertyId, setPropertyId] = React.useState<string>();

    const handleModalClose = () => {
        setPropertyId(undefined);
        setAgendaItems(defaultAgendaItems);
        onClose();
    }

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        toast.info(<Text localeParent='Common' localeKey='Please wait' />);
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
        onAddMeeting(propertyId, name, location, date, hours, minutes, agendaItems);
    }

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

    const removeItem = (index: number) => {
        const updatedItems = [...agendaItems];
        updatedItems.splice(index, 1);
        setAgendaItems(updatedItems);
    }

    const addItem = () => {
        setAgendaItems([...agendaItems, ""]);
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={handleModalClose}
            placement="top-center"
            size='2xl'
            classNames={{ wrapper: 'modal-wrapper' }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 pb-3"><Text localeParent='Meetings' localeKey='Create Meeting Agenda' /></ModalHeader>
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
                                    label={<Text localeParent='Common' localeKey='Address' />}
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
                                        label={<Text localeParent='Common' localeKey='Date' />}
                                        name="date"
                                        isRequired
                                        labelPlacement='outside'
                                        radius='sm'
                                        classNames={{ base: 'max-w-64 datepicker' }}
                                        hideTimeZone
                                        showMonthAndYearPickers
                                        defaultValue={todayWithTime}
                                        validationBehavior='native'
                                        isDateUnavailable={getIsMeetingDateUnavailable}
                                        hourCycle={24}
                                    />
                                    <div>
                                        <p className='mb-1.5 text-sm'><Text localeParent='Common' localeKey='Duration' /><span className='text-danger-500'>*</span></p>
                                        <div className='flex items-end gap-2 max-w-72'>
                                            <Input
                                                variant='bordered'
                                                aria-label="hours"
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
                                                defaultValue='1'
                                            />
                                            <Input
                                                variant='bordered'
                                                aria-label="minutes"
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
                                                defaultValue='0'
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
                                            <div className='flex items-center gap-3' key={index}>
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
                                                            updatedItems[index] = e.target.value;
                                                            setAgendaItems(updatedItems);
                                                        }}
                                                    />
                                                </div>
                                                <span onClick={() => removeItem(index)} className='rotate-45 cursor-pointer'>
                                                    <AiOutlinePlus />
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <Button variant='bordered' radius='sm' color='primary' startContent={<IoAdd />} onClick={addItem}><Text localeParent='Meetings' localeKey='Add Agenda Topic' /></Button>

                                <div className='flex justify-start items-center gap-2'>
                                    <Button color="default" variant="flat" onPress={onClose} radius='sm'>
                                        <Text localeParent="Common" localeKey="Close" />
                                    </Button>
                                    <Button type='submit' color={isPending ? "default" : "primary"} isLoading={isPending} isDisabled={isPending} className={cn({ "cursor-not-allowed": isPending })} radius='sm'>
                                        <Text localeParent='Meetings' localeKey='Create Meeting Agenda' />
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