import { createContext, useState } from "react";
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

export const LoadingContext = createContext()

function Loading({ children }) {

    const [loading, setLoading] = useState(false)

    const openLoading = (open = false, time = 500) => {
        if (open === true) {
            setLoading(open)
            return;
        }
        setTimeout(() => {
            setLoading(open)
        }, time)
    }

    return (
        <LoadingContext.Provider value={openLoading}>
            {children}
            <Spin
                spinning={loading}
                fullscreen
                indicator={
                    <LoadingOutlined
                        style={{ fontSize: 30, fontWeight: 'bold' }}
                        spin
                    />
                }
                tip={<b style={{ color: '#1e41da6b' }}>Loading ...</b>}
            />
        </LoadingContext.Provider>
    );
}

export default Loading;