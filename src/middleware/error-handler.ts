import { CustomAPIError } from "../errors/custom-error";

export const errorHandlerMiddleware = (err: any, req: any, res: any, next: any) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }
    console.log(err);
    return res.status(500).json('Something went wrong');
}