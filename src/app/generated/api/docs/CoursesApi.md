# CoursesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**activateCourse**](#activatecourse) | **PATCH** /my-courses/{id}/activate | Activate user course|
|[**createStripeCheckoutSession**](#createstripecheckoutsession) | **POST** /courses/{id}/checkout-session | Create Stripe Checkout session|
|[**getAllCourses**](#getallcourses) | **GET** /courses | Get all courses|
|[**getCourseById**](#getcoursebyid) | **GET** /courses/{id} | Get course details by ID|
|[**getMyCourses**](#getmycourses) | **GET** /my-courses | Get user courses|
|[**registerCourse**](#registercourse) | **POST** /courses/{id}/register | Register for a course|

# **activateCourse**
> activateCourse()

Change the status of a user course from PENDING to ACTIVE

### Example

```typescript
import {
    CoursesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoursesApi(configuration);

let id: number; //UserCourse ID to activate (default to undefined)

const { status, data } = await apiInstance.activateCourse(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | UserCourse ID to activate | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Course status updated to ACTIVE successfully |  -  |
|**401** | Unauthorized - Invalid or missing JWT token |  -  |
|**404** | UserCourse not found or does not belong to user |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createStripeCheckoutSession**
> StripeCheckoutSessionDto createStripeCheckoutSession()

Create a Stripe Checkout session for the specified course and return the session URL.

### Example

```typescript
import {
    CoursesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoursesApi(configuration);

let id: number; //Course ID to purchase (default to undefined)

const { status, data } = await apiInstance.createStripeCheckoutSession(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | Course ID to purchase | defaults to undefined|


### Return type

**StripeCheckoutSessionDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Stripe Checkout session created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllCourses**
> Array<CourseDto> getAllCourses()

Retrieve a list of all available courses in the platform

### Example

```typescript
import {
    CoursesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoursesApi(configuration);

const { status, data } = await apiInstance.getAllCourses();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<CourseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of all courses retrieved successfully |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getCourseById**
> CourseDto getCourseById()


### Example

```typescript
import {
    CoursesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoursesApi(configuration);

let id: number; //Course ID (default to undefined)

const { status, data } = await apiInstance.getCourseById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | Course ID | defaults to undefined|


### Return type

**CourseDto**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Course details |  -  |
|**404** | Course not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getMyCourses**
> Array<UserCourseDto> getMyCourses()

Retrieve all courses that the authenticated user is registered for

### Example

```typescript
import {
    CoursesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoursesApi(configuration);

const { status, data } = await apiInstance.getMyCourses();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<UserCourseDto>**

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User courses retrieved successfully |  -  |
|**401** | Unauthorized - Invalid or missing JWT token |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **registerCourse**
> registerCourse()

Register the authenticated user for a specific course with PENDING status

### Example

```typescript
import {
    CoursesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CoursesApi(configuration);

let id: number; //Course ID to register for (default to undefined)

const { status, data } = await apiInstance.registerCourse(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | Course ID to register for | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successfully registered for the course |  -  |
|**400** | Bad request - Already registered for this course |  -  |
|**401** | Unauthorized - Invalid or missing JWT token |  -  |
|**404** | Course not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

