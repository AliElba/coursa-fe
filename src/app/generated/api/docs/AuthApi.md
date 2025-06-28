# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**googleLogin**](#googlelogin) | **POST** /auth/google | Authenticate with Google|

# **googleLogin**
> AuthResponseDto googleLogin(googleLoginDto)

Exchanges a Google ID token for a JWT and user info. Creates a new user if they don\'t exist.

### Example

```typescript
import {
    AuthApi,
    Configuration,
    GoogleLoginDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let googleLoginDto: GoogleLoginDto; //Google ID token from frontend authentication

const { status, data } = await apiInstance.googleLogin(
    googleLoginDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **googleLoginDto** | **GoogleLoginDto**| Google ID token from frontend authentication | |


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
|**400** | Bad request - Invalid or missing ID token |  -  |
|**401** | Unauthorized - Invalid Google token |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

