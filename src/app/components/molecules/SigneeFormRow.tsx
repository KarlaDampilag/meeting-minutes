import React from 'react'
import { Button, Input } from '@nextui-org/react';
import { GoTrash } from 'react-icons/go';

import TeamMemberDropdown from './TeamMemberDropdown';
import Text from '../atoms/Text';

import { ISignee } from '../organisms/MeetingPageContent';

interface Props {
    companyId: string;
    signee: ISignee;
    setSignees: React.Dispatch<React.SetStateAction<ISignee[]>>;
    rowIndex: number;
}

const SigneeFormRow = ({ companyId, signee, setSignees, rowIndex }: Props) => {
    const onSigneeChange = (userId: string) => {
        setSignees((prev) => {
            const updated = [...prev];
            updated[rowIndex] = {
                ...prev[rowIndex],
                userId
            }
            return updated;
        });
    }

    const onTitleChange = (title: string) => {
        setSignees((prev) => {
            const updated = [...prev];
            updated[rowIndex] = {
                ...prev[rowIndex],
                title
            }
            return updated;
        });
    }

    const onDeleteRow = () => {
        setSignees((prev) => {
            const updated = [...prev];
            updated.splice(rowIndex, 1)
            return updated;
        });
    }

    return (
        <div className='flex items-center gap-2'>
            <TeamMemberDropdown
                companyId={companyId}
                selectedUserId={signee.userId}
                onChange={onSigneeChange}
                labelPlacement='outside'
                className=''
                customPlaceholder={<Text localeParent="Common" localeKey="Choose" />}
            />
            <Input
                variant='bordered'
                label="Company title"
                placeholder="Vorsitz"
                type='text'
                name='companyTitle'
                isRequired
                labelPlacement='outside'
                radius='sm'
                classNames={{ inputWrapper: 'border border-gray-300' }}
                validationBehavior='native'
                value={signee.title}
                onChange={(e) => onTitleChange(e.target.value)}
            />
            <Button isIconOnly startContent={<GoTrash size={16} />} className='mt-6' onClick={onDeleteRow} />
        </div>
    )
}

export default SigneeFormRow