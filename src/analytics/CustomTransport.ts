import { BaseTransport } from '@amplitude/analytics-core'
import { Payload, Response, Transport } from '@amplitude/analytics-types'

export enum OriginApplication {
  DOCS = 'docs',
  INTERFACE = 'interface',
}
/**
 * Allows us to set `x-origin-application` to correctly route
 * the application to the correct Amplitude project
 */
export class CustomTransport extends BaseTransport implements Transport {
  private originApplication: OriginApplication | undefined

  constructor(originApplication: OriginApplication | undefined) {
    super()
    this.originApplication = originApplication
  }
  async send(serverUrl: string, payload: Payload): Promise<Response | null> {
    /* istanbul ignore if */
    if (typeof fetch === 'undefined') {
      throw new Error('FetchTransport is not supported')
    }
    const options: RequestInit = {
      headers: {
        'x-origin-application': this.originApplication ?? OriginApplication.INTERFACE,
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(payload),
      method: 'POST',
    }
    const response = await fetch(serverUrl, options)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const responsePayload: Record<string, any> = await response.json()
    return this.buildResponse(responsePayload)
  }
}
