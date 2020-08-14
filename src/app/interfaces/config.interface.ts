export interface AppConfig {
  general: {
    apiKey: string;
  };
  urls: {
    placesAutoComplete: string;
    placeDetails: string;
    nearBySearch: string;
    placeLatLng: string;
    photo: string;
  };
  radius: {
    min: number;
    max: number;
    default: number;
  };
  mapOptions: google.maps.MapOptions;
}
