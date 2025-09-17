import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import FGAuthLayout from '@/Layouts/FGAuthLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import Lottie from 'lottie-react';
import React from 'react'
import star from '../../../../public/stars.json'

export default function Register() {

 const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

  return (
    <FGAuthLayout>
        <Head title="Register" />
        <div className="h-full w-full flex flex-col sm:flex-row gap-10 justify-between">
        <div className="bg-white h-full w-3/6 rounded-4xl p-12 flex flex-col gap-25">
            <div id="AuthFormHeader" className='w-full h-30 mt-15 font-GenSan'>
                <h3 className='text-[3em]'>Hi There!</h3>
                <Link
                href={route('login')}
                ><p className='text-gray-400'>Sudah ada akun? <i className='font-bold text-black'>Log in</i></p></Link>
            </div>
            <div id="AuthForm" className='w-full h-1/2 mb-15'>
                <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full border border-black"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full border border-black"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full border border-black"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full border border-black"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-15 flex items-center  items-center justify-center" >
                    <PrimaryButton className="ms-4 bg-[#23de35] hover:bg-[#20c830] active:bg-[#1cb22a] px-5 py-3 rounded-2xl text-xl w-1/2 text-white border-2 border-[#20c830] hover:cursor-pointer" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
            </div>
        </div>
        <div className="border border-white h-full w-4/6 rounded-4xl overflow-hidden relative z-1">
            <div id="right-content" className='text-white p-10 flex flex-col gap-5'>
                <h2 className='text-[9em] w-full'>Hey Friend!</h2>
                <p className='text-4xl -mt-10 w-3/4'>Signup sekarang, jangan bikin aku nungguin.</p>
            </div>
            <div className=" w-full h-full">
                    <Lottie animationData={star} loop={true} className='absolute size-[110rem] top-0 -right-70 z-0 scale-x-[-1]'/>
            </div>
        </div>
        </div>
    </FGAuthLayout>
  )
}
