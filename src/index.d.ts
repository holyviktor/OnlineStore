declare namespace Express {
    export interface Request {
        user?: {
            login: string;
            role: string;
        };
    }
}
