'use client'
import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import { IoMdRefresh } from 'react-icons/io';

import { invitedColumns } from './data';
import { UserWithCompany } from '@/db/schema';
import { useGetOpenInvites } from '@/rq-hooks/useGetOpenInvites';

const InvitedTable = ({ user }: { user: UserWithCompany | undefined }) => {
    const { data: openInvites, isLoading, refetch } = useGetOpenInvites({ companyId: user?.company_id });

    const renderCell = React.useCallback((invite: any, columnKey: string) => { // FIXME change type any
        const cellValue = invite[columnKey];

        switch (columnKey) {
            case "email":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{invite.invited_email}</p>
                    </div>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue?.name}</p>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className='mt-10'>
            <h3>Pending Invites</h3>
            <Button
                color='primary'
                variant='bordered'
                radius='sm'
                size='sm'
                startContent={<IoMdRefresh size={20} />}
                onClick={() => refetch()}
                className='text-medium mb-3'
            >
                Refresh
            </Button>
            <Table aria-label="Team table" radius='sm'>
                <TableHeader columns={invitedColumns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={openInvites || []} isLoading={isLoading}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default InvitedTable