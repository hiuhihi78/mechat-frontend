import { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Form, Input, Button, Row, Col, Modal } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';

import { updateUserPassword } from "~/api/User";
import { LoadingContext } from "~/contexts/UI/LoadingContext";
import { NotificationContext } from "~/contexts/UI/NotificationContext";
import { RESULT_CODES } from "~/constants/ResultCode.constant";
import { useNavigate } from "react-router-dom";
import { ENPOINT } from "~/constants/Enpoint.constant.ts";
import { removeAllDataInCookie } from "~/utils/cookie.util";

const { confirm } = Modal;

function ChangePassword() {

    const navigate = useNavigate()
    const auth = useAuthUser()
    const user = auth()
    const [form] = Form.useForm();
    const loading = useContext(LoadingContext)
    const notification = useContext(NotificationContext);

    const [userInfo, setUserInfo] = useState({})
    const [isUsernameExisted, setIsUsernameExisted] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        setIsUsernameExisted(user?.username !== null)
        setUserInfo({
            username: user.username
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const showConfirmUpdatePassword = () => {

        if (!isUsernameExisted) {
            let errors = form.getFieldsError().find(x => x.errors.length > 0 && x.name[0] !== "oldPassword")?.errors;
            if (errors?.length !== undefined) {
                notification('error', 'Thông báo', errors[0])
                return;
            }
        } else {
            let errors = form.getFieldsError().find(x => x.errors.length > 0)?.errors;
            if (errors?.length !== undefined) {
                notification('error', 'Thông báo', errors[0])
                return;
            }
        }

        confirm({
            title: 'Thông báo',
            icon: <ExclamationCircleFilled />,
            content: 'Bạn có chắc chắn thay đổi không?',
            okText: 'Đồng ý',
            onOk() {
                handleUpdatePassword()
            },
            okCancel: 'Hủy',
        });
    };

    const handleUpdatePassword = () => {
        form.submit()
        var data = {
            username: form.getFieldValue('username'),
            oldPassword: form.getFieldValue('oldPassword'),
            newPassword: form.getFieldValue('newPassword'),
        }
        loading(true)
        updateUserPassword(user.userId, data)
            .then((response) => {
                if (response.code === RESULT_CODES.WRONG_PASSWORD) {
                    setMessage('Sai mật khẩu cũ! Vui lòng nhập lại!')
                    return;
                } else if (response.code === RESULT_CODES.VALIDATION_ERROR) {
                    setMessage('Thông tin chưa đúng format!')
                    return;
                } else if (response.code === RESULT_CODES.USERNAME_EXISTED) {
                    setMessage('Tên đăng nhập đã tồn tại! Vui lòng nhập tên đăng nhập khác!')
                    return;
                } else if (response.code === RESULT_CODES.SUCCESS) {
                    loading(false)
                    confirm({
                        title: 'Thông báo',
                        icon: <ExclamationCircleFilled />,
                        content: 'Thay đổi thông tin tài khoản thành công!',
                        okText: 'Đăng nhập lại',
                        onOk() {
                            navigate(ENPOINT.SIGN_IN)
                            removeAllDataInCookie()
                        },
                        cancelButtonProps: {
                            hidden: true
                        },
                        onClose() {
                            navigate(ENPOINT.SIGN_IN)
                            removeAllDataInCookie()
                        }
                    });
                }
            })
            .catch(() => {

            })
            .finally(() => {
                loading(false)
            })
    }

    return (
        <>
            <Form
                form={form}
                labelCol={{
                    flex: '170px',
                }}
                initialValues={
                    {
                        username: user?.username
                    }
                }
                className="pt-10"
            >
                <Row>
                    <Col span={15} offset={2}>
                        <Form.Item
                            name='username'
                            label="Tên đăng nhập"
                            labelAlign="left"
                            validateTrigger="onBlur"
                            rules={[{
                                required: !isUsernameExisted,
                                message: 'Tên đăng nhập của bạn không được bỏ trống!',
                            }]}
                        >
                            <Row gutter={8}>
                                <Col span={17}>
                                    <Input
                                        value={userInfo?.username}
                                        disabled={isUsernameExisted}
                                        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                                        placeholder="Nhập tên đăng nhập của bạn!"
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item
                            name='oldPassword'
                            label="Mật khẩu cũ"
                            labelAlign="left"
                            validateTrigger="onBlur"
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập mật khẩu cũ của bạn!',
                            }]}
                            hidden={!isUsernameExisted}
                        >
                            <Row gutter={8}>
                                <Col span={17}>
                                    <Input.Password
                                        onChange={(e) => setUserInfo({ ...userInfo, oldPassword: e.target.value })}
                                        placeholder="Nhập mật khẩu cũ của bạn!"
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item
                            name='newPassword'
                            label="Mật khẩu mới"
                            labelAlign="left"
                            validateTrigger="onBlur"
                            rules={[{
                                required: true,
                                message: 'Vui lòng nhập mật khẩu mới của bạn!',
                            }]}
                        >
                            <Row gutter={8}>
                                <Col span={17}>
                                    <Input.Password
                                        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                                        placeholder="Nhập mật khẩu mới của bạn!"
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            label="Xác nhận mật khẩu mới"
                            labelAlign="left"
                            validateTrigger="onBlur"
                            dependencies={['newPassword']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng xác nhận mật khẩu mới!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Xác nhận mật khẩu không trùng khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Row gutter={8}>
                                <Col span={17}>
                                    <Input.Password
                                        placeholder="Nhập xác nhận mật khẩu mới của bạn!"
                                    />
                                </Col>
                            </Row>
                        </Form.Item>

                        {message === '' ?
                            <></>
                            :
                            <Form.Item>
                                <i className="text-red-500">{message}</i>
                            </Form.Item>
                        }
                        <Form.Item align="center">
                            <Button type="primary" htmlType="submit" onClick={showConfirmUpdatePassword}>
                                Xác nhận thay đổi
                            </Button>
                        </Form.Item>
                    </Col >
                </Row >
            </Form>
        </>
    );
}

export default ChangePassword;