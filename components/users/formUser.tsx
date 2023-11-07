import { UserCreate } from '@/models';
import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, useToast } from '@chakra-ui/react';
import { Utils } from '@/Utils';
const urlAPI = process.env.URL_API || 'http://localhost:3000/api/';

const FormUser = forwardRef(function FormUser(props: any, ref) {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<UserCreate>();
    const refSubmit = useRef<HTMLInputElement>(null);
    const [defaultEmailValue, setDefaultEmailValue] = useState<string>('');
    const [defaultNameValue, setDefaultNameValue] = useState<string>('');
    const toast = useToast();
    const onSubmit = handleSubmit(async (data) => {
        try {
            if (!props.user) {
                await Utils.Fetch.customFetch(`${urlAPI + '/users'}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                toast({
                    position: 'top-right',
                    title: 'Create user successfully',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                await Utils.Fetch.customFetch(`${urlAPI + '/users'}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: props.user.id,
                        email: data.email,
                        name: data.name,
                    }),
                });
                toast({
                    position: 'top-right',
                    title: 'Update user successfully',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }
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
    useEffect(() => {
        const user = props?.user || null;
        if (user) {
            setDefaultNameValue(props.user.name);
            setDefaultEmailValue(props.user.email);
        }
    }, [props.user]);
    return (
        <form onSubmit={onSubmit}>
            <FormControl isRequired isInvalid={errors && errors.email != undefined}>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    {...register('email', {
                        required: true,
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Please input a valid email address',
                        },
                    })}
                    placeholder="Email"
                    defaultValue={defaultEmailValue}
                />
                {errors?.email ? <FormErrorMessage>{errors.email.message}</FormErrorMessage> : <FormHelperText>We will never share your email.</FormHelperText>}
            </FormControl>

            <FormControl isRequired className="mt-3" isInvalid={errors && errors.name != undefined}>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    {...register('name', {
                        required: true,
                        max: {
                            value: 20,
                            message: 'Your name is too long',
                        },
                        min: {
                            value: 4,
                            message: 'Your name is too short',
                        },
                    })}
                    placeholder="Name"
                    defaultValue={defaultNameValue}
                />
                {errors?.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
            </FormControl>

            <input type="submit" className="hidden" ref={refSubmit} />
        </form>
    );
});

export default FormUser;
