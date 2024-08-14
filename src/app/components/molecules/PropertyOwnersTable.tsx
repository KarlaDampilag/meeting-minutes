'use client'
import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@nextui-org/react";

import { useGetPropertyOwners } from '@/rq-hooks/useGetPropertyOwners';

const columns = [
    { name: "NAME", uid: "name" },
    { name: "EMAIL", uid: "email" },
    { name: "TELEPHONE", uid: "telephone" },
    { name: "OWNERSHIP PERCENTAGE", uid: "ownershipPercentage" },
    { name: "ACTIONS", uid: "actions" },
];

const PropertyOwnersTable = ({ companyId, propertyId }: { companyId: string, propertyId: string }) => {
    const { data, isLoading, isRefetching } = useGetPropertyOwners({ companyId, propertyId });

    const renderCell = React.useCallback((owner: any, columnKey: string) => { // FIXME change type any
        const cellValue = owner[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{owner.first_name} {owner.last_name}</p>
                    </div>
                );
            case "email":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{cellValue}</p>
                    </div>
                );
            case "telephone":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{cellValue}</p>
                    </div>
                );
            case "ownershipPercentage":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">{owner.ownership_share}%</p>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-4">
                        {/* <span className="text-lg cursor-pointer">
                            <UpdateUserButton user={user} />
                        </span>
                        <span className="text-lg cursor-pointer">
                            <DeleteUserFromCompanyButton user={user} />
                        </span> */}
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <Table aria-label="Team table" radius='sm'>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={data || []} isLoading={isLoading || isRefetching} loadingContent={<Spinner />}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default PropertyOwnersTable