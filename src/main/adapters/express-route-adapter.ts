import { Request, Response } from 'express'
import { Controller } from '@/presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const requestData = {
      ...(request.body || {}),
      ...(request.params || {}),
      accountId: request.accountId
    }
    const httpResponse = await controller.handle(requestData)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
