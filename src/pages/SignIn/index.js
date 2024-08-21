import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Button } from 'antd'

export function SignIn() {

    const [buttonLoading, setButtonLoading] = useState(false)

    const clickButton = () => {
        setButtonLoading(true)
    }

    return (
        <>
            <div className="bg-blue-500 text-white p-4">
                This is a Tailwind CSS styled component.
            </div>
            <FontAwesomeIcon icon={faUser} />
            <Button loading={buttonLoading} onClick={clickButton}>SignIn</Button>
        </>
    )
}