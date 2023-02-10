'use client';
import Link from 'next/link';
import Image from 'next/image';
import PasswordInput from '@/components/RegisterComponents/PasswordInput';
import PasswordConfirmationInput from '@/components/RegisterComponents/PasswordConfirmationInput';
import EmailInput from '@/components/RegisterComponents/EmailInput';
import Alert from '@/components/RegisterComponents/Alert';
import useAuth from '@/hooks/useAuth';
import SubmitButton from '@/components/RegisterComponents/SubmitButton';

export default function RegisterPage() {
  const {error, handleCloseError, handleSignUp, hiddenPassword, setHiddenPassword} = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirmation } = Object.fromEntries(new window.FormData(e.target));
    handleSignUp(email, password, passwordConfirmation);
  }

  return (
    <div className='min-h-screen max-w-md flex flex-col gap-3 justify-center items-center mx-auto px-10'>
      <Image
        src='/first-logo.png'
        width={200}
        height={200}
        alt='Next Quiz App Logo'
      />
      <h1 className='text-3xl font-bold text-purple-900 -mt-5 text-center'>
        Create your account
      </h1>
      <p className='text-zinc-600 text-sm'>
        Already have an account?
        <Link href='/login' className='text-purple-500 font-bold'>
        {' '}Sign In
        </Link>
      </p>

      {error && <Alert message={error} handleCloseError={handleCloseError}/>}

      <form className='rounded-xl bg-white flex flex-col justify-center items-center py-7 px-7 gap-5 w-full' 
      onSubmit={handleSubmit}>
        <EmailInput />
        <PasswordInput hiddenPassword={hiddenPassword} setHiddenPassword={setHiddenPassword} isSignUp={true}/>
        <PasswordConfirmationInput hiddenPassword={hiddenPassword} />
        <SubmitButton>Sign Up</SubmitButton>
      </form>
    </div>
  );
}
