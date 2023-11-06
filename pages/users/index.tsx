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
    useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
const urlAPI = process.env.URL_API || 'http://localhost:3000/api/';

const UserPage = () => {
    const [usersData, setUsersData] = useState<User[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const formRef = useRef<HTMLFormElement>(null);
    const callCreateFunction = () => {
        if (formRef?.current) {
            formRef.current.handleSubmitFunction();
        }
    };

    const handleCloseModal = () => {
        console.log('Event emitted from child component!');
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await Utils.Fetch.customFetch<User[]>(`${urlAPI + '/users'}`);
                if (result.status === 200) {
                    console.log('🚀 ~ file: index.tsx:18 ~ fetchData ~ result:', result);
                    setUsersData(result.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
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
                        <Button colorScheme="teal" className="ml-10" onClick={onOpen}>
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
                                {usersData.map((user, i) => {
                                    return (
                                        <Tr key={user.id}>
                                            <Td>{i + 1}</Td>
                                            <Td>{user.email}</Td>
                                            <Td>{user.name}</Td>
                                            <Td>
                                                <ButtonGroup gap="4">
                                                    <Button colorScheme="twitter">{<EditIcon />}</Button>
                                                    <Button variant="solid" colorScheme="red">
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

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new user</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormUser ref={formRef} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="teal" onClick={callCreateFunction}>
                            Create
                        </Button>
                        <Button variant="ghost" ml={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default UserPage;
