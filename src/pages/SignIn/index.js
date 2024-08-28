import { useContext, useState } from 'react'
import { signIn, signInByGoogle } from '~/api/Auth'
import { RESULT_CODES } from '~/constants/ResultCode.constant.ts'
import { useNavigate } from 'react-router-dom';

import { useSignIn } from 'react-auth-kit';
import { storeAccessToken, storeUserId } from '~/utils/cookie.util';
import { LoadingContext } from '~/contexts/LoadingContext';
import { GoogleLogin } from '@react-oauth/google';

export function SignIn() {

    const navigate = useNavigate();
    const signInAuth = useSignIn();
    const loading = useContext(LoadingContext)


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const onSubmit = (event) => {
        event.preventDefault();
        if (username === '' || password === '') {
            setMessage('Please enter your username and password!');
            return;
        }

        loading(true)
        var data = {
            username,
            password
        }

        signIn(data).then((response) => {
            handleSignIn(response)
        }).finally(() => {
            loading(false)
        })
    }

    const handleSignInGoogleSuccess = (response) => {
        var data = {
            googleToken: response.credential
        }
        loading(true)

        signInByGoogle(data).then((response) => {
            handleSignIn(response)
        })
            .finally(() => {
                loading(false)
            })
    }

    const handleSignIn = (response) => {
        if (response.code !== RESULT_CODES.SUCCESS) {
            setMessage(response.message)
            return;
        }

        signInAuth({
            token: '',
            expiresIn: 10000,
            //refresh: result.value.refreshToken,
            authState: {
                userId: response.value.userId,
                fullname: response.value.fullname,
                roleId: response.value.roleId
            }
        })

        storeUserId(response.value.userId)
        storeAccessToken(response.value.accessToken)
        navigate('/home')
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
                                    <label className="mb-2 block text-xs font-semibold" htmlFor="username">Username</label>
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
                                    <label className="mb-2 block text-xs font-semibold" htmlFor='password'>Password</label>
                                    <input
                                        type="password"
                                        name='password'
                                        placeholder="*****"
                                        className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </div>

                                {message === '' ?
                                    <></>
                                    :
                                    <div className="mb-3 flex flex-wrap content-center">
                                        <i style={{ color: 'red', fontSize: '14px' }}>{message}</i>
                                    </div>
                                }

                                <div className="mb-3 flex flex-wrap content-center">
                                    <input id="remember" type="checkbox" className="mr-1 checked:bg-purple-700" name='remember' />
                                    <label htmlFor='remember' className="mr-auto text-xs font-semibold">Remember for 30 days</label>
                                    <a href="fac" className="text-xs font-semibold text-purple-700" htmlFor='remember'>Forgot password?</a>
                                </div>

                                <div className="mb-3">
                                    <button className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">
                                        Sign in
                                    </button>
                                    <GoogleLogin
                                        onSuccess={handleSignInGoogleSuccess}
                                        useOneTap
                                        size='large'
                                    />
                                </div>
                            </form>

                            <div className="text-center">
                                <span className="text-xs text-gray-400 font-semibold">Don't have account?</span>
                                <a href="fa" className="text-xs font-semibold text-purple-700">Sign up</a>
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