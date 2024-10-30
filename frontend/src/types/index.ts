export interface Location {
    name: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

export interface Event {
    _id: string;
    title: string;
    description?: string;
    eventType: 'adoption' | 'fundraising' | 'volunteer';
    startDate: Date;
    endDate: Date;
    location: Location;
    organizer: string;
    participants: string[];
    pets: string[];
    targetFundAmount?: number;
    currentFundAmount: number;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}
