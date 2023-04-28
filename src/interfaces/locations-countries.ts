export interface Country {
    id: number;
    name: string;
  }
  
  export interface Location {
    id: number;
    countryId: number;
    name: string;
    latitude: string;
    longitude: string;
  }