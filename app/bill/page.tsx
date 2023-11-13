'use client';
import FormBill from '@/components/bill/formBill';
import { Bill } from '@/models';
import { AddIcon } from '@chakra-ui/icons';
import {
    Button,
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
    Badge,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useContractRead, usePublicClient } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import abi from '../../dapp/artifacts/contracts/Bill.sol/BillModel.json';
import { walletClient } from '../../Utils/config';
const convertDate = (timestamp: number) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
const BillPage = () => {
    const [billsData, setBillsData] = useState<Bill[]>([]);
    const [isOpenModalBill, setIsOpenModalBill] = useState<boolean>(false);
    const toast = useToast();
    const formRef = useRef<HTMLFormElement | null>(null);

    const callCreateFunction = () => {
        if (formRef.current) {
            formRef.current.handleSubmitFunction();
        }
    };

    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    });
    const publicClient = usePublicClient();

    const fetchData = async () => {
        const data: any[] = (await publicClient.readContract({
            address: '0x1555b57988951Bdfeed2D137380414C2Adf6C274',
            abi: abi.abi,
            functionName: 'getAllBills',
        })) as any;
        console.log('🚀 ~ file: page.tsx:55 ~ fetchData ~ data:', data);
        if (data) {
            data.forEach((bill) => {
                bill.time = convertDate(parseInt(bill.time));
                bill.amount = parseInt(bill.amount);
                bill.userId = parseInt(bill.userId);
            });
            setBillsData(data.reverse());
        }
    };

    const createBill = async (timeStamp: number, testItem: string, amount: number, userId: number) => {
        // JSON-RPC Account
        const [account] = await walletClient.getAddresses();
        const { request }: any = await publicClient.simulateContract({
            account,
            address: '0x1555b57988951Bdfeed2D137380414C2Adf6C274',
            abi: abi.abi,
            args: [timeStamp, testItem, amount, userId],
            functionName: 'createBill',
        });
        const result = await walletClient.writeContract(request);
        if (result) {
            console.log('🚀 ~ file: page.tsx:87 ~ createBill ~ result:', result);
            await fetchData();
            toast({
                title: 'Bill created.',
                description: 'We have created a new bill for you.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        fetchData?.();
    }, []);

    // close modal when created bill
    const handleCloseModal = () => {
        setIsOpenModalBill(false);
    };

    const openModalCreate = () => {
        setIsOpenModalBill(true);
    };

    const openModalUpdateUser = async (bill: Bill) => {
        console.log(bill);
        setIsOpenModalBill(true);
    };

    const closeModalBill = () => {
        setIsOpenModalBill(false);
    };
    return (
        <>
            <div>
                <Container className="mt-6">
                    <Center>
                        <h2 className="center my-11">Manage bills using Solidity and graphql</h2>
                        <Button colorScheme="teal" className="ml-10" onClick={openModalCreate}>
                            {<AddIcon />}
                        </Button>
                    </Center>
                    <Center>
                        <Badge>Connected to:</Badge>
                        <Badge colorScheme="green">{address}</Badge>
                    </Center>
                    <Center className="mt-3">
                        <Button colorScheme="orange" onClick={() => disconnect()}>
                            Disconnect
                        </Button>
                        <Button colorScheme="teal" onClick={() => connect()} className="ml-3">
                            Connect Wallet
                        </Button>
                    </Center>
                    <TableContainer className="max-w-full mx-10 mb-20">
                        <Table variant="striped">
                            <Thead>
                                <Tr>
                                    <Th>No.</Th>
                                    <Th>Date</Th>
                                    <Th>Item Name</Th>
                                    <Th>Amount</Th>
                                    <Th>User</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {billsData?.map((bill, i) => {
                                    return (
                                        <Tr key={bill.id}>
                                            <Td>{i + 1}</Td>
                                            <Td>{bill.time}</Td>
                                            <Td>{bill.itemName}</Td>
                                            <Td>{bill.amount}</Td>
                                            <Td>{bill.userId}</Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>

            <Modal isOpen={isOpenModalBill} onClose={() => closeModalBill()}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create new bill</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormBill ref={formRef} closeModal={handleCloseModal} createBill={createBill} />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="teal" onClick={callCreateFunction}>
                            Create
                        </Button>
                        <Button variant="ghost" ml={3} onClick={() => closeModalBill()}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default BillPage;
