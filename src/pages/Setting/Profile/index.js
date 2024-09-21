import { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Space, Form, Input, Button, Row, Col, Upload, Avatar, Flex, Modal } from "antd";
import { EditOutlined, UploadOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { ExclamationCircleFilled } from '@ant-design/icons';

import { updateUserInfo, getUser } from "~/api/User";
import { LoadingContext } from "~/contexts/UI/LoadingContext";
import defaultImage from '~/assets/default-image.png'
import { getBase64 } from "~/utils/file.util";
import { NotificationContext } from "~/contexts/UI/NotificationContext";
import { RESULT_CODES } from "~/constants/ResultCode.constant.ts";
import clsx from "clsx";
import styles from "./Profile.module.scss"

const { confirm } = Modal;

export function Profile() {

    const auth = useAuthUser()
    const user = auth()
    const [formUserInfo] = Form.useForm();
    const loading = useContext(LoadingContext)
    const notification = useContext(NotificationContext);

    const [userInfo, setUserInfo] = useState({})
    const [userInfoBeforeChange, setUserInfoBeforeChange] = useState({})
    const [avatar, setAvatar] = useState('')
    const [coverPhoto, setCoverPhoto] = useState('')
    const [enableEdit, setEnableEdit] = useState(false)

    useEffect(() => {
        loading(true)
        var id = user.userId
        getUser(id).then((response) => {
            var data = response.value
            var info = {
                userId: data.id,
                email: data.email,
                avatar: data.avatar,
                fullname: data.fullname,
                username: data.username,
                coverPhoto: data.coverPhoto
            }
            setUserInfo(info)
            setUserInfoBeforeChange(info)
            setAvatar(data.avatar)
            setCoverPhoto(data.coverPhoto)
        }).catch((err) => {

        }).finally(() => {
            loading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCancleEdit = () => {
        formUserInfo.resetFields()
        setEnableEdit(false)
        setUserInfo({ ...userInfoBeforeChange })
        setAvatar(userInfoBeforeChange.avatar)
        setCoverPhoto(userInfoBeforeChange.coverPhoto)
    }

    const handleChangeAvatar = async (info) => {
        var imgBase64 = await getBase64(info.file.originFileObj)
        setAvatar(imgBase64)
    }

    const handleChangeCoverPhoto = async (info) => {
        var imgBase64 = await getBase64(info.file.originFileObj)
        setCoverPhoto(imgBase64)
    }

    const showConfirmEditProfile = () => {
        var errors = formUserInfo.getFieldsError().find(x => x.errors.length > 0)?.errors;
        if (errors?.length !== undefined) {
            notification('error', 'Thông báo', errors[0])
            return;
        }
        confirm({
            title: 'Thông báo',
            icon: <ExclamationCircleFilled />,
            content: 'Bạn có chắc chắn thay đổi không?',
            okText: 'Đồng ý',
            onOk() {
                handleEditUserInfo()
            },
            okCancel: 'Hủy',
        });
    };

    const handleEditUserInfo = () => {
        formUserInfo.submit()
        var data = {
            fullname: formUserInfo.getFieldValue('fullname'),
            avatar: formUserInfo.getFieldValue('avatar')?.file?.originFileObj ?? null,
            coverPhoto: formUserInfo.getFieldValue('coverPhoto')?.file?.originFileObj ?? null
        }
        loading(true)
        updateUserInfo(user.userId, data)
            .then((response) => {
                if (response.code !== RESULT_CODES.SUCCESS) {
                    notification("error", response.message)
                } else {
                    notification("success", "Thay đổi thông tin cá nhân thành công!")
                    setUserInfoBeforeChange({
                        ...userInfoBeforeChange,
                        fullname: data.fullname,
                        avatar: (avatar === userInfoBeforeChange.avatar) ? userInfoBeforeChange.avatar : avatar
                    })
                    setEnableEdit(false)
                }
            })
            .catch(() => {
                loading(false)
            })
            .finally(() => {
                loading(false)
            })
    }


    return (
        <>
            <div className="mb-5">
                <Flex justify="flex-end" align="flex-start">
                    {(() => {
                        if (!enableEdit) {
                            return (
                                <Button type="primary"
                                    ghost
                                    onClick={() => setEnableEdit(true)}
                                >
                                    <EditOutlined /> Chỉnh sửa
                                </Button>
                            )
                        } else {
                            return (
                                <Space>
                                    <Button
                                        onClick={() => handleCancleEdit()}
                                    >
                                        <FontAwesomeIcon icon={faXmark} /> Hủy
                                    </Button>
                                    <Button type="primary" onClick={showConfirmEditProfile} danger ghost>
                                        <FontAwesomeIcon icon={faCheck} /> Xác nhận
                                    </Button>
                                </Space>
                            )
                        }
                    })()}
                </Flex>
            </div>
            <Form
                form={formUserInfo}
                labelCol={{
                    flex: '110px',
                }}
                initialValues={
                    {
                        fullname: userInfo.fullname,
                    }
                }
            >
                <Row>
                    <Col span={15} offset={2}>
                        <Form.Item
                            name='fullname'
                            label="Họ và tên"
                            labelAlign="left"
                            rules={[{
                                required: true,
                                message: 'Tên của bạn không được bỏ trống',
                            }]}
                        >
                            <Row gutter={8}>
                                <Col span={17}>
                                    <Input
                                        value={userInfo.fullname}
                                        disabled={!enableEdit}
                                        style={{ backgroundColor: "white" }}
                                        onChange={(e) => setUserInfo({ ...userInfo, fullname: e.target.value })}
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                        {user.username === '' ?
                            <></>
                            :
                            <Form.Item label="Tài khoản" labelAlign="left">
                                <Row gutter={8}>
                                    <Col span={17}>
                                        <Input value={userInfo.username} disabled />
                                    </Col>
                                </Row>
                            </Form.Item>
                        }

                        <Form.Item label="Email" labelAlign="left">
                            <Row gutter={8}>
                                <Col span={17}>
                                    <Input value={userInfo.email} disabled />
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col >

                    <Col span={6}>

                        <Flex vertical align="center" >
                            <>
                                <Avatar
                                    size={150}
                                    src={avatar}
                                    fallback={defaultImage}
                                    className="mb-5"
                                />
                                {enableEdit === true ?
                                    <Form.Item
                                        name='avatar'
                                        required
                                        style={{ width: '100%', textAlign: 'center' }}
                                    >
                                        <Upload
                                            showUploadList={false}
                                            maxCount={2}
                                            accept=".png, .jpeg, .jpg"
                                            onChange={handleChangeAvatar}
                                        >
                                            <Button icon={<UploadOutlined />}>Tải lên</Button>
                                            <div style={{ textAlign: 'center' }}> (PNG, JPG hoặc JPEG)</div>
                                        </Upload>
                                    </Form.Item>
                                    :
                                    <></>
                                }
                            </>
                            <>
                                <img
                                    src={coverPhoto}
                                    className={clsx(styles['cover-photo'])}
                                    alt="cover-photo"
                                />
                                {enableEdit === true ?
                                    <Form.Item
                                        name='coverPhoto'
                                        required
                                        style={{ width: '100%', textAlign: 'center' }}
                                    >
                                        <Upload
                                            showUploadList={false}
                                            maxCount={2}
                                            accept=".png, .jpeg, .jpg"
                                            onChange={handleChangeCoverPhoto}
                                        >
                                            <Button icon={<UploadOutlined />}>Tải lên</Button>
                                            <div style={{ textAlign: 'center' }}> (PNG, JPG hoặc JPEG)</div>
                                        </Upload>
                                    </Form.Item>
                                    :
                                    <></>
                                }
                            </>
                        </Flex>
                    </Col>
                </Row >
            </Form>
        </>
    );
}
