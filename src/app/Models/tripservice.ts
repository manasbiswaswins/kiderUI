import { Time } from '@angular/common'

export class Tripservice {
  id: number
  routeId: number
  tripId: number
  circuitServiceId: number
  activeFrom: Date
  activeTo: Date
  beginTime: Time
  endTime: Time
  distance: number
  occup: number
}
