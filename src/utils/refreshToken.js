import { createRefresh } from "react-auth-kit";
import { refreshToken } from '~/api/Auth'
import { getRefreshToken, storeRefreshToken, storeAccessToken } from "./cookie.util";

export const handleRefreshToken = createRefresh({
    interval: 1,
    refreshApiCallback: async () => {
        var data = {
            refreshToken: getRefreshToken()
        }
        refreshToken(data).then((response) => {
            storeRefreshToken(response.value.refreshToken)
            storeAccessToken(response.value.accessToken)
            return {
                isSuccess: true,
                newAuthToken: response.value.accessToken,
                newAuthTokenExpireIn: 10000,
                newRefreshTokenExpiresIn: 10000,
            };
        }).catch((err) => {
            window.location.reload()
        })
    }
})