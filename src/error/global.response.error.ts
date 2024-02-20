import { Request } from 'express';
import { IResponseError } from './response.error.interface';

export const GlobalResponseError: (statusCode: number, message: string, code: string, request: Request) => IResponseError = (
    statusCode: number,
    message: string,
): IResponseError => {
    return {
        statusCode: statusCode,
        message
    };
};


