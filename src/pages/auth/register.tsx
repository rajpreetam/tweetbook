import Head from "next/head";
import emailImage from '@/assets/images/email.png';
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/register/RegisterForm";
import Link from "next/link";

const RegisterPage = () => {
    return (
        <>
            <Head>
                <title>TweetBook | Register</title>
                <meta content="Let's connect together on tweetbook - login" />
            </Head>

            <div className='flex flex-col lg:flex-row space-y-2'>
                <div className='relative h-[200px] lg:h-screen lg:w-[50%] flex items-center'>
                    <img
                        src={emailImage.src}
                        alt="Image"
                        className='absolute top-0 left-0 w-full h-full object-cover -z-20 opacity-10'
                    />
                    <div className='absolute top-0 left-0 w-full h-full bg-purple-600 opacity-20 -z-10' />
                    <div className='flex flex-col items-start space-y-1 px-6 w-full max-w-md mx-auto'>
                        <h1 className='text-4xl font-semibold'>TweetBook</h1>
                        <p className='text-xl'>Tweetbook: Lets Connect Together and have some FUN!!!</p>
                    </div>
                </div>
                <div className='flex flex-col lg:justify-center space-y-6 px-6 py-10 w-full max-w-md mx-auto'>
                    <div className='flex items-center space-x-4'>
                        <div className='flex items-center justify-center w-14 h-14 bg-purple-500 dark:bg-purple-600 text-white rounded-full'>
                            <p className='text-3xl font-semibold tracking-wide'>Tb</p>
                        </div>
                        <div className='h-16 w-[0.5px] bg-gray-700 dark:bg-gray-300' />
                        <div>
                            <h1 className='text-xl'>Online</h1>
                            <h1 className='text-xl'>Communities</h1>
                        </div>
                    </div>

                    <h1 className='text-2xl font-semibold'>Register</h1>

                    <RegisterForm />

                    <div className='flex flex-col items-center justify-center'>
                        <p>
                            <span className='font-semibold'>Terms of Service</span> and <span className='font-semibold'>Privacy Policy</span>
                        </p>
                        <p className='mt-4'>Already have an account? <Link href='/auth/login' className='underline underline-offset-4 font-medium'>Login Here</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;