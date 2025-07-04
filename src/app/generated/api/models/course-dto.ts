/* tslint:disable */
/* eslint-disable */
/**
 * Coursa API
 * API documentation for Coursa backend
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import type { LectureDto } from './lecture-dto';

/**
 * 
 * @export
 * @interface CourseDto
 */
export interface CourseDto {
    /**
     * 
     * @type {number}
     * @memberof CourseDto
     */
    'id': number;
    /**
     * 
     * @type {string}
     * @memberof CourseDto
     */
    'title': string;
    /**
     * 
     * @type {string}
     * @memberof CourseDto
     */
    'description': string;
    /**
     * 
     * @type {string}
     * @memberof CourseDto
     */
    'image': string;
    /**
     * 
     * @type {number}
     * @memberof CourseDto
     */
    'hours': number;
    /**
     * 
     * @type {number}
     * @memberof CourseDto
     */
    'numberOfExams': number;
    /**
     * 
     * @type {number}
     * @memberof CourseDto
     */
    'price': number;
    /**
     * 
     * @type {Array<LectureDto>}
     * @memberof CourseDto
     */
    'lectures': Array<LectureDto>;
}

