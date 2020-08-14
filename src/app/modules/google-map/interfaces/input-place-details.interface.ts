export interface InputPlaceDetails {
  name: string;
  photos: Partial<[]>;
  opening_hours: { open_now: boolean };
  icon: string;
  formatted_address: string;
  formatted_phone_number: string;
  rating: string;
}
