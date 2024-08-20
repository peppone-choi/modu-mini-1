import { Location } from "../@types/location.type";
export const getLocation = (): Location => {
  let location: Location = {
    latitude: 0,
    longitude: 0,
  };
  navigator.geolocation.getCurrentPosition(async (position) => {
    location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  });
  return location;
};
