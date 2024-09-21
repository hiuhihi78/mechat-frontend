import RealTimeContext from "../RealTime"
import UIContextContainer from "../UI"

const ContextContainer = ({ children }) => {
    return (
        <>
            <UIContextContainer>
                <RealTimeContext>
                    {children}
                </RealTimeContext>
            </UIContextContainer>
        </>
    )
}

export default ContextContainer