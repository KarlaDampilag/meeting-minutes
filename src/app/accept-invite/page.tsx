'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useAcceptInvite } from '@/rq-hooks/useAcceptInvite'
import Text from '../components/atoms/Text'

const AcceptInvitePage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const inviteId = searchParams.get('id');

    const { mutate, isSuccess } = useAcceptInvite();

    React.useEffect(() => {
        if (!!inviteId) {
            mutate({ inviteId });
        }
    
        if (isSuccess) {
            router.push('/dashboard');
        }
    }, [inviteId, isSuccess]);

    return (
        <div className='px-5 py-2'><Text localeParent='Common' localeKey='Please wait' /></div>
    )
}

export default AcceptInvitePage