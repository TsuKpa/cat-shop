import React from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, Center } from '@chakra-ui/react';
import Link from 'next/link';
const UserPage = () => {
    return (
        <>
            <Center className="mt-6">
                <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
                    <BreadcrumbItem>
                        <Link href="/">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <Link href="/users">Users</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href="/todolist">Todo-list</Link>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Center>
            user page
        </>
    );
};

export default UserPage;
