import { UserCreate } from '@/models';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react';
import { Utils } from '@/Utils';
const urlAPI = process.env.URL_API || 'http://localhost:3000/api/';

const FormUser = forwardRef(function FormUser(props, ref) {
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<UserCreate>();
    const refSubmit = useRef<HTMLInputElement>(null);
    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        try {
            await Utils.Fetch.customFetch(`${urlAPI + '/users'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log('🚀 create user success');
            // close modal

            // fetch list
        } catch (error) {
            console.error('Error create user:', error);
        }
    });
    // useImperativeHandle used for call a function from parent component
    useImperativeHandle(ref, () => ({
        handleSubmitFunction: () => {
            trigger();
            if (refSubmit?.current) {
                refSubmit.current.click();
            }
            console.log('Child function called!');
        },
    }));
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
                />
                {errors?.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
            </FormControl>

            <input type="submit" className="hidden" ref={refSubmit} />
        </form>
    );
});

export default FormUser;
