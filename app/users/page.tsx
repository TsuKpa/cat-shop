'use client';
import FormUser from '@/components/users/formUser';
import { User } from '@/models';
import { AllUsersQuery, DeleteUserMutation } from '@/nexus/client';
import { getUrqlClient } from '@/nexus/client/graphclient';
import { Query } from '@/nexus/generated/graphql';
import { MyMachineReactContext } from '@/xstate';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Badge,
    Button,
    ButtonGroup,
    Center,
    Container,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
const { client } = getUrqlClient();

const deleteUserURQL = async (id: number) => {
    const result = await client.mutation(DeleteUserMutation, { id }).toPromise();
    return result;
};

const UserPage = () => {
    // use xstate
    const [state, send] = MyMachineReactContext.useActor();

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

    const fetchData = useCallback(async () => {
        try {
            if (state.value === 'success') {
                setUsersData(state.context.users);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [state]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
            await deleteUserURQL(currentUserId);
            toast({
                position: 'top-right',
                title: 'Delete user successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            send('callFetch');
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
            <div>
                <Center className="my-4">
                    <Badge>User Count:</Badge>
                    <Badge colorScheme="green">{state.context.users ? JSON.stringify(state.context.users.length) : 0}</Badge>
                </Center>
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
                    <ModalHeader>{currentUser ? 'Update user' : 'Create new user'}</ModalHeader>
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
