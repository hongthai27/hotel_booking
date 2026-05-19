export interface RoomImage {
  id: number;
  roomTypeId: number;
  imageUrl: string;
  displayOrder: number;
  createdAt: string;
}

export interface Amenity {
  id: number;
  amenityName: string;
  description?: string;
}

export interface RoomType {
  id: number;
  typeName: string;
  description?: string;
  maxCapacity: number;
  basePrice: number;
  version: number; 
  images: RoomImage[];
  amenities: Amenity[];
  availableRoomCount?: number;
  lowestPrice?: number;
}

export interface SearchParams {
  checkIn: string;
  checkOut: string;
  guests: number;
  minPrice?: number;
  maxPrice?: number;
}