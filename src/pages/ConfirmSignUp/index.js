import { useLayoutEffect, useState } from "react";

import { Button } from 'antd';
import { ENPOINT } from '~/constants/Enpoint.constant';
import { useNavigate } from "react-router-dom";
import { confrimSignUp } from "~/api/Auth";
import { RESULT_CODES } from "~/constants/ResultCode.constant";

function ConfirmSignUp() {

    const [loading, setLoading] = useState(true)
    const queryParameters = new URLSearchParams(window.location.search)
    const navigate = useNavigate()

    const accessToken = queryParameters.get('accessToken')
    const [message, setMessage] = useState('')


    useLayoutEffect(() => {
        confrimSignUp(accessToken).then((response) => {
            if (response.code !== RESULT_CODES.SUCCESS) {
                setMessage('Cannot register!')
            }
        }).catch((error) => {
            setMessage('Cannot register!')
        })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 5000)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200 py-10">
                <div className="flex shadow-md">
                    <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{ width: "24rem", height: "32rem" }}>
                        <div className="w-72">
                            <>
                                {(() => {
                                    if (loading) {
                                        return (
                                            <>
                                                <div class="relative flex justify-center items-center">
                                                    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                                                    <img src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-1/444151048_3675983452660958_468097532445298241_n.jpg?stp=cp6_dst-jpg_s160x160&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=wRPBeAZt0UEQ7kNvgEgAU2M&_nc_ht=scontent.fhan2-4.fna&oh=00_AYDyQtwGQ9DnHOWACfk5Yw9_vAexBjpsEmVXn8Y5UIzEcg&oe=66D9A4BC" class="rounded-full h-28 w-28" alt="logo" />
                                                </div>
                                                <p className="text-center mt-5">Loading...</p>
                                            </>
                                        )
                                    }
                                })()}
                            </>

                            <>
                                {(() => {
                                    if (message === '' && loading === false) {
                                        return (
                                            <>
                                                <div class="relative p-4 text-center">
                                                    <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                                                        <svg aria-hidden="true" class="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                                        <span class="sr-only">Success</span>
                                                    </div>
                                                    <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                                        <i >Your account register success!</i>
                                                        <Button type='link'
                                                            onClick={() => navigate(ENPOINT.SIGN_IN)}
                                                            className="text-xs font-semibold text-purple-700"
                                                        >
                                                            Sign in
                                                        </Button>
                                                    </p>

                                                </div >
                                            </>
                                        )
                                    } else {
                                        <>
                                            <i className="text-center text-red-500">{message}</i>
                                        </>
                                    }
                                })()}
                            </>
                        </div>
                    </div>

                    <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{ width: "24rem", height: "32rem" }}>
                        <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="https://i.imgur.com/9l1A4OS.jpeg" alt='' />
                    </div>

                </div>
            </div>
        </>
    );
}

export default ConfirmSignUp;