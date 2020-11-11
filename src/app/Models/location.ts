export class Location {
    id:number
    name:string
    coordinates:Geocordinate[]
    carrierCustomerKey:string
}

export class Geocordinate {
    seq:number
    lon: number
    lat:number
}