import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

import Text from '../atoms/Text'

const TopNav = () => {
    return (
        <div className='top-nav'>
            <Link href="/"><span>LOGO</span></Link>
            <SignedOut>
                <SignInButton><button><Text localeParent="Auth" localeKey="Sign in" /></button></SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}

export default TopNav