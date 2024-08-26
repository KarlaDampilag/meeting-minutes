import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

import Card from './Card'
import Text from './Text'

const FirstAdminPendingApprovalCard = () => {
    return (
        <div className='flex justify-center h-fit w-full'>
            <Card className='!max-w-lg'>
                <FaCheckCircle size={40} className='text-primary mb-6 mx-auto' />
                <h3 className='text-center mb-6'><Text localeParent='Onboarding' localeKey='firstAdminPendingTitle' /></h3>
                <p className='text-center'><Text localeParent='Onboarding' localeKey='firstAdminPendingDescription' /></p>
            </Card>
        </div>
    )
}

export default FirstAdminPendingApprovalCard