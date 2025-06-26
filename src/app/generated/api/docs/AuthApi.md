# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**googleLogin**](#googlelogin) | **POST** /auth/google | Authenticate with Google|

# **googleLogin**
> AuthResponseDto googleLogin(googleLoginDto)

Exchanges a Google ID token for a JWT and user info.

### Example

```typescript
import {
    AuthApi,
    Configuration,
    GoogleLoginDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let googleLoginDto: GoogleLoginDto; //

const { status, data } = await apiInstance.googleLogin(
    googleLoginDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **googleLoginDto** | **GoogleLoginDto**|  | |


### Return type

**AuthResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | JWT and user info returned on successful login. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

