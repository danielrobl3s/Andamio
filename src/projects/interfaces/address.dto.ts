import { Decimal } from "@prisma/client/runtime/binary";

export interface address {
    lat: Decimal;
    lng: Decimal;
    address: string;
}