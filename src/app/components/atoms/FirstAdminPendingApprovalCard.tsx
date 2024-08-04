import React from 'react'
import Card from './Card'
import { FaCheckCircle } from 'react-icons/fa'

const FirstAdminPendingApprovalCard = () => {
    return (
        <div className='flex justify-center h-fit w-full'>
            <Card>
                <FaCheckCircle size={40} className='text-primary mb-4 mx-auto' />
                <h3 className='text-center mb-4'>Company details submitted for verification</h3>
                <p className='text-center'>Thank you for submitting your company information. We will notify you via email once the verification is complete and your account has been approved.</p>
            </Card>
        </div>
    )
}

export default FirstAdminPendingApprovalCard