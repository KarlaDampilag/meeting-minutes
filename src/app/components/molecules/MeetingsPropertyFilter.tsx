'use client'
import React from 'react';
import { IoFilter } from 'react-icons/io5';

import PropertiesDropdown from './PropertiesDropdown';
import Text from '../atoms/Text';

const MeetingsPropertyFilter = ({ companyId, selectedPropertyId, onChange }: { companyId: string, selectedPropertyId: string | undefined, onChange: (selectedUserId: string) => void }) => {
    return (
        <PropertiesDropdown
            companyId={companyId}
            selectedId={selectedPropertyId}
            onChange={onChange}
            labelPlacement='outside'
            useAriaLabel
            className=''
            startContent={<IoFilter size={18} className='min-w-fit mr-1' />}
            customPlaceholder={<Text localeParent="Roles" localeKey="Property Manager" />}
            allowAll
        />
    );
}

export default MeetingsPropertyFilter;