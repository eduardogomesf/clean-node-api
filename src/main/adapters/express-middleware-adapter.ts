import { NextFunction, Request, Response } from 'express'
import { Middleware } from '@/presentation/protocols'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const requestData = {
      accessToken: request.headers?.['x-access-token'],
      ...(request.headers || {})
    }
    const httpResponse = await middleware.handle(requestData)
    if (httpResponse.statusCode === 200) {
      Object.assign(request, httpResponse.body)
      next()
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
