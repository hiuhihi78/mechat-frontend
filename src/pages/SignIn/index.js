import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { signIn } from '~/api/Auth'
import { RESULT_CODES } from '~/constants/resultCode.constant.ts'
import { useNavigate } from 'react-router-dom';
import { Color } from 'antd/es/color-picker'

export function SignIn() {

    const navigate = useNavigate();

    const [message, setMessage] = useState('')
    const [buttonLoading, setButtonLoading] = useState(false)

    const clickButton = () => {
        setButtonLoading(true)
    }

    const onFinish = (values) => {
        var data = {
            username: values.username,
            password: values.password
        }

        signIn(data).then((response) => {
            var result = response.data
            if (result.code == RESULT_CODES.SUCCESS) {
                navigate('/home')
            }

            setMessage(result.message)

        })
    }

    return (
        // <>
        //     <div className="bg-blue-500 text-white p-4">
        //         This is a Tailwind CSS styled component.
        //     </div>
        //     <FontAwesomeIcon icon={faUser} />
        //     <Button loading={buttonLoading} onClick={clickButton}>SignIn</Button>
        // </>
        <>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    {message === '' ? <></> : <i style={{ color: 'red' }}>{message}</i>}
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}