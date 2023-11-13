import { BillCreateForm } from '@/models';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, useToast } from '@chakra-ui/react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';

const FormBill = forwardRef(function FormBill(props: any, ref) {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<BillCreateForm>();
    const refSubmit = useRef<HTMLInputElement>(null);
    const toast = useToast();
    const onSubmit = handleSubmit(async (data) => {
        try {
            // create bill blockchain
            props.createBill(new Date().getTime(), data.itemName, data.amount, data.userId);
            // close modal
            props.closeModal();
        } catch (error) {
            if (!props.user) {
                console.error('Error create user:', error);
                toast({
                    position: 'top-right',
                    title: 'Create user failed',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                console.error('Error update user:', error);
                toast({
                    position: 'top-right',
                    title: 'Update user failed',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    });
    // useImperativeHandle, forwardRef used for call a function from parent component
    useImperativeHandle(ref, () => ({
        handleSubmitFunction: () => {
            trigger();
            if (refSubmit?.current) {
                refSubmit.current.click();
            }
        },
    }));
    return (
        <form onSubmit={onSubmit}>
            <FormControl isRequired isInvalid={errors && errors.itemName != undefined}>
                <FormLabel>Item name</FormLabel>
                <Input
                    type="text"
                    {...register('itemName', {
                        required: true,
                    })}
                    placeholder="Item name"
                    defaultValue=""
                />
                {errors?.itemName && <FormErrorMessage>{errors.itemName.message}</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired className="mt-3" isInvalid={errors && errors.amount != undefined}>
                <FormLabel>Amount</FormLabel>
                <Input
                    type="number"
                    {...register('amount', {
                        required: true,
                        max: {
                            value: 20,
                            message: 'Your amount is too long',
                        },
                        min: {
                            value: 4,
                            message: 'Your amount is too short',
                        },
                    })}
                    placeholder="Amount"
                />
                {errors?.amount && <FormErrorMessage>{errors.amount.message}</FormErrorMessage>}
            </FormControl>

            <FormControl isRequired className="mt-3" isInvalid={errors && errors.userId != undefined}>
                <FormLabel>User id</FormLabel>
                <Input
                    type="text"
                    {...register('userId', {
                        required: true,
                        max: {
                            value: 10,
                            message: 'Your id is too long',
                        },
                    })}
                    placeholder="User id"
                />
                {errors?.userId && <FormErrorMessage>{errors.userId.message}</FormErrorMessage>}
            </FormControl>

            <input type="submit" className="hidden" ref={refSubmit} />
        </form>
    );
});

export default FormBill;
