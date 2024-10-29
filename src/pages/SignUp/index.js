import { useContext, useState } from 'react'
import { Form, Input, Button } from 'antd';

import { signUp } from '~/api/Auth'
import { RESULT_CODES } from '~/constants/ResultCode.constant'
import { LoadingContext } from '~/contexts/UI/LoadingContext';
import { useNavigate } from 'react-router-dom';
import { ENPOINT } from '~/constants/Enpoint.constant';

export function SignUp() {

    const loading = useContext(LoadingContext)
    const navigate = useNavigate();

    const [message, setMessage] = useState('')

    const onFinish = (values) => {
        var data = {
            username: values.username,
            password: values.password,
            email: values.email
        }
        loading(true)
        signUp(data).then((response) => {
            if (response.code === RESULT_CODES.FAILURE) {
                setMessage(response.message)
                return;
            }
            if (response.code !== RESULT_CODES.SUCCESS) {
                setMessage("Server error!")
                return;
            }
            setMessage('Sign up success! <br/>Please check your email to confirm!')
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
                            <h1 className="text-xl font-semibold pt-10">Me Chat</h1>
                            <Form
                                onFinish={onFinish}
                                layout="vertical"
                            >
                                <Form.Item
                                    hasFeedback
                                    label="Username"
                                    name="username"
                                    validateTrigger="onBlur"
                                    rules={[{
                                        required: true,
                                        message: 'Please confirm your username!',
                                    }]}
                                >
                                    <Input placeholder="Enter your username" />
                                </Form.Item>
                                <Form.Item
                                    hasFeedback
                                    label="Password"
                                    name="password"
                                    validateTrigger="onBlur"
                                    rules={[{
                                        required: true,
                                        message: 'Please confirm your password!',
                                    }]}
                                >
                                    <Input.Password placeholder="Enter your password" />
                                </Form.Item>
                                <Form.Item
                                    hasFeedback
                                    label="Confirm password"
                                    name="confirmPassword"
                                    validateTrigger="onBlur"
                                    dependencies={['password']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The password that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder="Enter your confirm password" />
                                </Form.Item>
                                <Form.Item
                                    hasFeedback
                                    label="Email"
                                    name="email"
                                    validateTrigger="onBlur"
                                    rules={[{ type: 'email', required: true }]}
                                >
                                    <Input placeholder="Enter your email" />
                                </Form.Item>
                                <div className='mb-3'>
                                    {message === '' ?
                                        <></> :
                                        <i className='text-red-500'>{message}</i>
                                    }
                                </div>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" >
                                        Sign Up
                                    </Button>
                                </Form.Item>
                            </Form>

                            <div className="text-end mb-10">
                                <span className="text-xs text-gray-400 font-semibold">Back to </span>
                                <Button type='link' onClick={() => navigate(ENPOINT.SIGN_IN)} className="text-xs font-semibold text-purple-700">Sign in</Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{ width: "24rem", height: "32rem" }}>
                        <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="https://i.imgur.com/9l1A4OS.jpeg" alt='' />
                    </div>

                </div>
            </div >
        </>
    )
}