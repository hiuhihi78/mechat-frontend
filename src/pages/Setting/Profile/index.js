import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { Image, Space, Form, Input, Button, Row, Col, Upload, Avatar, Flex } from "antd";
import { EditOutlined, UploadOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";


import { getUser } from "~/api/User";
import { LoadingContext } from "~/contexts/LoadingContext";
import styles from "./Profile.module.scss"
import clsx from "clsx";
import defaultImage from '~/assets/default-image.png'
import { getBase64 } from "~/utils/file.util";

function Profile() {

    const auth = useAuthUser()
    const user = auth()
    const [formUserInfo] = Form.useForm();
    const loading = useContext(LoadingContext)

    const [userInfo, setUserInfo] = useState({})
    const [userInfoBeforeChange, setUserInfoBeforeChange] = useState({})
    const [avatar, setAvatar] = useState('')
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
                username: data.username
            }
            setUserInfo(info)
            setUserInfoBeforeChange(info)
            setAvatar(data.avatar)
        }).catch((err) => {

        }).finally(() => {
            loading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCancleEdit = () => {
        setEnableEdit(false)
        setUserInfo({ ...userInfoBeforeChange })
        setAvatar(userInfoBeforeChange.avatar)
    }

    const handleChangeAvatar = async (info) => {
        var imgBase64 = await getBase64(info.file.originFileObj)
        console.log(imgBase64)
        setAvatar(imgBase64)
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
                                    <Button type="primary" danger ghost>
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
                initialValues={userInfo}
            >
                <Row>
                    <Col span={15} offset={2}>
                        <Form.Item name='fullName' label="Họ và tên" labelAlign="left"
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
                            <Avatar
                                size={200}
                                src={avatar}
                                fallback={defaultImage}
                                className="mb-5"
                            />
                            {enableEdit === true ?
                                <Form.Item name='fileUpload' required style={{ width: '100%', textAlign: 'center' }}>
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
                        </Flex>
                    </Col>
                </Row >
            </Form>

            {/* <Form
                layout="vertical"
                            className={clsx(styles.container)}
            >
                            <div className={clsx(styles.avatar)}>
                                <Image
                                    width={200}
                                    height={200}
                                    src={userInfo?.avatar}
                                    fallback={defaultImage}
                                />
                            </div>
                            <div className={clsx(styles.info)}>
                                <Form.Item label="Tên người dùng">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Tên đăng nhập">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Email">
                                    <Input />
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary">Submit</Button>
                                </Form.Item>
                            </div>
                        </Form> */}
        </>
    );
}

export default Profile;