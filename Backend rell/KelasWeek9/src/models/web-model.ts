export type WebResponse<T> = {
    data?: T;
    errors?: string;
    message?: string;
}