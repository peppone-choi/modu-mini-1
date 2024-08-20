import { Location } from "../@types/location.type";

export const getLocation = async (): Promise<Location> => {
  let latitude: number = 0;
  let longitude: number = 0;

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  } catch (error) {
    console.error("Error getting location:", error);
  }

  return { latitude, longitude };
};
