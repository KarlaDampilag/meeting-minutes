'use client'
import React from 'react';
import { IoFilter } from 'react-icons/io5';

import PropertyManagerDropdown from './PropertyManagerDropdown';
import Text from '../atoms/Text';

const PropertiesPropertyManagerFilter = ({ companyId, selectedPropertyManagerId, onChange }: { companyId: string, selectedPropertyManagerId: string | undefined, onChange: (selectedUserId: string) => void }) => {
    return (
        <PropertyManagerDropdown
            companyId={companyId}
            selectedUserId={selectedPropertyManagerId}
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

export default PropertiesPropertyManagerFilter;