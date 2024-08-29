import { useContext, useState } from 'react'


import { signUp } from '~/api/Auth'
import { RESULT_CODES } from '~/constants/ResultCode.constant.ts'
import { LoadingContext } from '~/contexts/LoadingContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignUp() {

    const loading = useContext(LoadingContext)


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const onSubmit = (event) => {
        event.preventDefault();
        if (username === '' || password === '' ||
            email === '' || confirmPassword === ''
        ) {
            setMessage('Please enter your information!');
            return;
        }

        if (!email.match(emailRegex)) {
            setMessage('Invalid email!')
            return;
        }

        if (password !== confirmPassword) {
            setMessage('Confirm password is not match!')
            return;
        }

        loading(true)
        var data = { username, password, email }
        signUp(data).then((response) => {
            if (response.Code === RESULT_CODES.VALIDATION_ERROR) {
                setMessage(response.Value[0].Message)
                return;
            }
            if (response.code !== RESULT_CODES.SUCCESS) {
                setMessage(response.message)
                return;
            }
            setMessage('Sign up success! Please check your email to confirm!')
        })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                loading(false)
            })
    }


    return (
        <>
            <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
                <div className="flex shadow-md">
                    <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{ width: "24rem", height: "32rem" }}>
                        <div className="w-72">
                            <h1 className="text-xl font-semibold">Me Chat</h1>

                            <form className="mt-4" onSubmit={(e) => onSubmit(e)}>
                                <div className="mb-3">
                                    <label className="mb-2 block text-xs font-semibold" htmlFor="username">
                                        Username
                                        <b style={{ color: 'red', marginLeft: '3px' }}>*</b>
                                    </label>
                                    <input
                                        type="text"
                                        name='username'
                                        placeholder="Enter your username"
                                        className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                        value={username}
                                        onChange={(e) => { setUsername(e.target.value) }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="mb-2 block text-xs font-semibold" htmlFor='email'>
                                        Email
                                        <b style={{ color: 'red', marginLeft: '3px' }}>*</b>
                                    </label>
                                    <input
                                        type="email"
                                        name='email'
                                        placeholder="Enter your email"
                                        className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="mb-2 block text-xs font-semibold" htmlFor='password'>
                                        Password
                                        <b style={{ color: 'red', marginLeft: '3px' }}>*</b>
                                    </label>
                                    <input
                                        type="password"
                                        name='password'
                                        placeholder="*****"
                                        className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="mb-2 block text-xs font-semibold" htmlFor='confirmPassword'>
                                        Confirm password
                                        <b style={{ color: 'red', marginLeft: '3px' }}>*</b>
                                    </label>
                                    <input
                                        type="password"
                                        name='confirmPassword'
                                        placeholder="*****"
                                        className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                        value={confirmPassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                                    />
                                </div>

                                {message === '' ?
                                    <></>
                                    :
                                    <div className="mb-3 flex flex-wrap content-center">
                                        <i style={{ color: 'red', fontSize: '14px' }}>{message}</i>
                                    </div>
                                }
                                <div className="mb-3">
                                    <button className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <div className="text-end">
                                <span className="text-xs text-gray-400 font-semibold">Back to </span>
                                <a href="fa" className="text-xs font-semibold text-purple-700">Sign in</a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{ width: "24rem", height: "32rem" }}>
                        <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="https://i.imgur.com/9l1A4OS.jpeg" alt='' />
                    </div>

                </div>
            </div>
        </>
    )
}