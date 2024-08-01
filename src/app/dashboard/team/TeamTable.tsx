'use client'
import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import { columns, users } from './data';
import { GoPencil, GoTrash } from 'react-icons/go';


const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const TeamTable = () => {
    const renderCell = React.useCallback((user: any, columnKey: string) => { // FIXME change type any
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        {/* <p className="text-bold text-sm capitalize text-default-400">{user.team}</p> */}
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={(statusColorMap as any)[user.status]} size="sm" variant="flat"> {/** FIXME change type any */}
                        {cellValue}
                    </Chip>
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
        <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={users}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey as string)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default TeamTable