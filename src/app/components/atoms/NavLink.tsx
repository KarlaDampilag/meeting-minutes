'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const NavLink = ({ href, text, icon, className }: { href: string, text: string | JSX.Element, icon: JSX.Element, className?: string }) => {
    const pathname = usePathname()

    const classNameFinal = [
        className,
        pathname === href ? 'active' : ''
    ].join(' ');

    return (
        <Link href={href} className={classNameFinal}><span>{icon}</span> <div>{text}</div></Link>
    )
}
