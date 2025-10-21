export interface LastPosData {
    name: string;
    vin: string;
    position: {
        latitude: number; // y
        longitude: number; // x
    }
}