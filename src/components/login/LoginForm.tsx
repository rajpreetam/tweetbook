import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { signIn, useSession } from "next-auth/react";
import { KeyIcon, AtSymbolIcon} from '@heroicons/react/24/outline';
import { Messages } from '@/components/ui/Messages';
import { loginValidationSchema } from '@/schemas/loginSchema';
import { useState } from 'react';

const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            setLoading(true);

            const {email, password} = values;
            
            const res =  await signIn('credentials', {
                email,
                password,
                redirect: false
            });
            
            if(res?.ok) {
                toast.success('Logged In Successfully!');
                router.push('/');
            } else {
                toast.error(res?.error);
            };
            
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

            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                    <input type="checkbox" />
                    <p>Remember Me</p>
                </div>
                <h1>Forgot Password?</h1>
            </div>

            <button
                type='submit'
                className='bg-purple-500 dark:bg-purple-600 text-white py-2 text-xl rounded-md'
            >
                {loading ? 'Logging In...' : 'Login'}
            </button>
        </form>
    );
};

export default LoginForm;