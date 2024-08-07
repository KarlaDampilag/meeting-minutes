'use client'
import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User } from "@nextui-org/react";
import { teamColumns } from './data';
import { GoPencil, GoTrash } from 'react-icons/go';
import { UserWithCompany } from '@/db/schema';
import { useGetUsers } from '@/rq-hooks/useGetUsers';

const TeamTable = ({ user }: { user: UserWithCompany | undefined }) => {
    const { data: users, isLoading } = useGetUsers({ companyId: user?.company_id });

    const renderCell = React.useCallback((user: any, columnKey: string) => { // FIXME change type any
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "email":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.image_url }}
                        description={cellValue}
                        name={`${user.first_name} ${user.last_name}`}
                    >
                        {cellValue}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue?.name}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-4">
                        <span className="text-lg text-default-600 cursor-pointer active:opacity-50">
                            <GoPencil />
                        </span>
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <GoTrash />
                        </span>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className='mt-10'>
            <h3>Team</h3>
            <Table aria-label="Team table" radius='sm'>
                <TableHeader columns={teamColumns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={users || []} isLoading={isLoading}>
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

export default TeamTable