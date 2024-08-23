import { RequestInterceptor } from "../RequestInterceptor"
import { ResponseInterceptor } from "../ResponseInterceptor"


export const InterceptorContainer = ({ children }) => {
    return (
        <>
            <RequestInterceptor>
                <ResponseInterceptor>
                    {children}
                </ResponseInterceptor>
            </RequestInterceptor>
        </>
    )
}