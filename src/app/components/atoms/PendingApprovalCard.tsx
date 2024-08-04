import React from 'react'
import Card from './Card'
import { FaCheckCircle } from 'react-icons/fa'

const PendingApprovalCard = () => {
    return (
        <div className='flex justify-center h-fit w-full'>
            <Card>
                <FaCheckCircle size={40} className='text-primary mb-6 mx-auto' />
                <h3 className='text-center mb-6'>Awaiting Invitation</h3>
                <p className='text-center'>To access your company&apos;s features, an existing admin must invite you. Please contact your company admin for an invitation. You&apos;ll receive an email notification once the invitation is sent.</p>
            </Card>
        </div>
    )
}

export default PendingApprovalCard