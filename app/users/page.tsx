'use client';
import FormUser from '@/components/users/formUser';
import { User } from '@/models';
import { Utils } from '@/Utils';
import { ChevronRightIcon, DeleteIcon, EditIcon, AddIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonGroup,
    Center,
    Container,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { getUrqlClient } from '@/nexus/graphclient';
const urlAPI = process.env.URL_API || 'http://localhost:3000/api/';
import { AllUsersQuery } from '@/nexus/queries.graphql';
import { Query } from '@/nexus/generated/graphql';

function getAllFilms() {
    const { client } = getUrqlClient();
    const result = client.query<Query>(AllUsersQuery, {}).toPromise();
    return result;
}

const UserPage = () => {
    const [usersData, setUsersData] = useState<User[]>([]);
    const [isOpenModalUser, setIsOpenModalUser] = useState<boolean>(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [currentUserId, setCurrentUserId] = useState<number>();
    const [currentUser, setCurrentUser] = useState<User>();
    const toast = useToast();
    const formRef = useRef<HTMLFormElement>(null);
    const callCreateFunction = () => {
        if (formRef?.current) {
            formRef.current.handleSubmitFunction();
        }
    };

    const fetchData = async () => {
        try {
            const { data } = await getAllFilms();
            if (data?.allUsers != undefined) {
                setUsersData(data.allUsers as User[]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    // close modal when created user
    const handleCloseModal = () => {
        setIsOpenModalUser(false);
        setCurrentUser(undefined);
        fetchData();
    };

    const openModalCreate = () => {
        setIsOpenModalUser(true);
    };

    const openModalDelete = (id: number) => {
        setIsOpenModalDelete(true);
        setCurrentUserId(id);
    };

    const deleteUser = async () => {
        if (!currentUserId) return;
        try {
            await Utils.Fetch.customFetch(`${urlAPI + '/users'}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentUserId),
            });
            toast({
                position: 'top-right',
                title: 'Delete user successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setIsOpenModalDelete(false);
            fetchData();
            setCurrentUserId(undefined);
        } catch (error) {
            console.log(error);
            toast({
                position: 'top-right',
                title: 'Delete user failed',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };
    const openModalUpdateUser = async (user: User) => {
        console.log(user);
        setIsOpenModalUser(true);
        setCurrentUser(user);
    };
    const closeModalDelete = () => {
        setIsOpenModalDelete(false);
        setCurrentUserId(undefined);
    };
    const closeModalUser = () => {
        setIsOpenModalUser(false);
        setCurrentUser(undefined);
    };
    return (
        <>
            <Center className="mt-6">
                <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
                    <BreadcrumbItem>
                        <Link href="/">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <Link href="/users" className="underline">
                            Users
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href="/todolist">Todo-list</Link>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Center>
            <div>
                <Container className="mt-6">
                    <Center>
                        <h2 className="center my-11">Manage users using Graphql and Prisma</h2>
                        <Button colorScheme="teal" className="ml-10" onClick={openModalCreate}>
                            {<AddIcon />}
                        </Button>
                    </Center>
                    <TableContainer className="max-w-full mx-10 mb-20">
                        <Table variant="striped">
                            <Thead>
                                <Tr>
                                    <Th>No.</Th>
                                    <Th>Email</Th>
                                    <Th>Name</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {usersData?.map((user, i) => {
                                    return (
                                        <Tr key={user.id}>
                                            <Td>{i + 1}</Td>
                                            <Td>{user.email}</Td>
                                            <Td>{user.name}</Td>
                                            <Td>
                                                <ButtonGroup gap="4">
                                                    <Button colorScheme="twitter" onClick={() => openModalUpdateUser(user)}>
                                                        {<EditIcon />}
                                                    </Button>
                                                    <Button variant="solid" colorScheme="red" onClick={() => openModalDelete(user.id)}>
                                                        {<DeleteIcon />}
                                                    </Button>
                                                </ButtonGroup>
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>

            <Modal isOpen={isOpenModalUser} onClose={() => closeModalUser()}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new user</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormUser ref={formRef} closeModal={handleCloseModal} user={currentUser} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme={currentUser ? 'blue' : 'teal'} onClick={callCreateFunction}>
                            {currentUser ? 'Update' : 'Create'}
                        </Button>
                        <Button variant="ghost" ml={3} onClick={() => closeModalUser()}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal onClose={() => closeModalDelete} isOpen={isOpenModalDelete} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Notification</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Are you sure want to delete this user?</ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={() => deleteUser()}>
                            Delete
                        </Button>
                        <Button onClick={() => closeModalDelete()} className="ml-6">
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UserPage;
