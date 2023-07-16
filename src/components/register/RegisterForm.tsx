import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { signIn, useSession } from "next-auth/react";
import {UserIcon, KeyIcon, AtSymbolIcon} from '@heroicons/react/24/outline';
import { Messages } from '@/components/ui/Messages';
import { useState } from 'react';
import { registerValidationSchema } from '@/schemas/registerSchema';
import Link from 'next/link';
import { baseQuery } from '@/services';

const RegisterForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirm_password: ''
        },
        validationSchema: registerValidationSchema,
        onSubmit: async (values) => {
            setLoading(true);

            const {
                email,
                username,
                password,
                confirm_password
            } = values;

            try {
                const res = await baseQuery.post('/auth/users', {
                    email,
                    username,
                    password,
                    confirm_password
                });

                console.log(res.data);
                

                const signInRes =  await signIn('credentials', {
                    email,
                    password,
                    redirect: false
                }); 
                
                if(signInRes?.ok) {
                    toast.success(res.data.message);
                    router.push('/')    ;
                } else {
                    toast.error(signInRes?.error);
                };
                
            } catch(err: any) {
                toast.error(err.response.data.message);                
            }
            
            setLoading(false);
        }
    });
    return (
        <form
            className='flex flex-col space-y-4'
            onSubmit={formik.handleSubmit}
        >
            <div className='flex items-center border rounded-md px-2 py-1'>
                <AtSymbolIcon className='w-6 h-6' />
                <input
                    name='email'
                    type="email"
                    className='bg-transparent px-4 py-2 outline-none w-full'
                    placeholder='Email'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
            </div>
            {formik.touched.email && formik.errors.email ? (
                <Messages type='error' message={formik.errors.email} />
            ) : null}

            <div className='flex items-center border rounded-md px-2 py-1'>
                <UserIcon className='w-6 h-6' />
                <input
                    name='username'
                    type="text"
                    className='bg-transparent px-4 py-2 outline-none w-full'
                    placeholder='Username'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                />
            </div>
            {formik.touched.username && formik.errors.username ? (
                <Messages type='error' message={formik.errors.username} />
            ) : null}

            <div className='flex items-center border rounded-md px-2 py-1'>
                <KeyIcon className='w-6 h-6' />
                <input
                    name='password'
                    type="password"
                    className='bg-transparent px-4 py-2 outline-none w-full'
                    placeholder='Password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
            </div>
            {formik.touched.password && formik.errors.password ? (
                <Messages type='error' message={formik.errors.password} />
            ) : null}

            <div className='flex items-center border rounded-md px-2 py-1'>
                <KeyIcon className='w-6 h-6' />
                <input
                    name='confirm_password'
                    type="password"
                    className='bg-transparent px-4 py-2 outline-none w-full'
                    placeholder='Confirm Password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm_password}
                />
            </div>
            {formik.touched.confirm_password && formik.errors.confirm_password ? (
                <Messages type='error' message={formik.errors.confirm_password} />
            ) : null}

            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <input type="checkbox" />
                    <p>Remember Me</p>
                </div>
            </div>

            <button
                type='submit'
                className='bg-purple-500 dark:bg-purple-600 text-white py-2 text-xl rounded-md'
            >
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
};

export default RegisterForm;