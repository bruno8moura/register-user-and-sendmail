
export interface IRequest {
    data: any
}

export interface ILogger {
    info(req: IRequest)
    error(req: IRequest)
}
