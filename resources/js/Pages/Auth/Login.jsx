
import Checkbox from '@/Components/Checkbox'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FGAuthLayout from '@/Layouts/FGAuthLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import star from '../../../../public/stars.json'
import Lottie from 'lottie-react'

export default function Login({status, canResetPassword}) {
        const { data, setData, post, processing, errors, reset } = useForm({
            email: '',
            password: '',
            remember: false,
        });
    
        const submit = (e) => {
            e.preventDefault();
    
            post(route('login'), {
                onFinish: () => reset('password'),
            });
        };
  return (
    <FGAuthLayout>
        <Head title="Log in" />
        <div className="h-full w-full flex flex-col sm:flex-row gap-10 justify-between items-center">
        <div className="bg-white h-[calc(100vh-3rem)] w-3/6 rounded-4xl p-12 flex flex-col gap-25 font-GenSan">
            <div id="AuthFormHeader" className='w-full h-30 mt-15'>
                
                <h3 className='text-[3em] '>Welcome Back!</h3>
                <Link
                href={route('register')}
                ><p className='text-gray-400'>Belum ada akun? <span className='font-bold text-black'>signup</span></p></Link>
            </div>
            <div id="AuthForm" className='w-full h-1/2 mb-15'>
                <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full border border-black"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2 text-red-600" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password"/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full border border-black"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2 text-red-600" />
                </div>

                {/* <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-normal">
                            Remember me
                        </span>
                    </label>
                </div> */}

                <div className=" mt-10 flex flex-col-reverse items-center justify-center gap-3">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600  hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your <span className='font-bold'>password?</span>
                        </Link>
                    )}

                    <PrimaryButton className="ms-4 bg-[#23de35] hover:bg-[#20c830] active:bg-[#1cb22a] px-5 py-3 rounded-2xl text-xl w-1/2 text-white border-2 border-[#20c830] hover:cursor-pointer" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
            </div>
        </div>
        <div className="border border-white h-[calc(100vh-3rem)] w-4/6 rounded-4xl overflow-hidden relative z-1">
            <div id="right-content" className='text-white p-10 flex flex-col gap-5 font-GenSan'>
                <h2 className='text-[8.5em] w-full font-semibold'>Welcome!</h2>
                <p className='text-4xl -mt-10 w-3/4'>Login dulu, biar aku yakin kamu beneran yang ku tunggu.</p>
            </div>
            <div className=" w-full h-full">
                    <Lottie animationData={star} loop={true} className='absolute size-[70rem] top-20 -left-5 z-0'/>
            </div>
        </div>
        </div>
    </FGAuthLayout>
  )
}
