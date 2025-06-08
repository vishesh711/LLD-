class ParkingSpot:
    def __init__(self, spot_id, spot_type):
        self.spot_id = spot_id
        self.spot_type = spot_type
        self.vehicle = None  # No vehicle initially.

    def assign_vehicle(self, vehicle):
        if self.vehicle is None:
            self.vehicle = vehicle
            return True
        return False

    def remove_vehicle(self):
        if self.vehicle is not None:
            self.vehicle = None
            return True
        return False

    def is_empty(self):
        return self.vehicle is None


class Vehicle:
    def __init__(self, license_plate, vehicle_type):
        self.license_plate = license_plate
        self.vehicle_type = vehicle_type
        self.entry_time = None  # Time can be set when vehicle enters the lot.

    def get_vehicle_details(self):
        return f"License Plate: {self.license_plate}, Type: {self.vehicle_type}"


class ParkingLot:
    def __init__(self, capacity, spot_types=['compact', 'regular', 'oversized']):
        self.capacity = capacity
        self.occupied_count = 0
        self.parking_spots = []
        # Create parking spots with different types (compact, regular, oversized).
        for i in range(capacity):
            spot_type = spot_types[i % len(spot_types)]  # Cycling through the types
            self.parking_spots.append(ParkingSpot(i, spot_type))

    def find_available_spot(self, vehicle_type):
        for spot in self.parking_spots:
            if spot.is_empty() and spot.spot_type == vehicle_type:
                return spot
        return None  # No available spot for this type.

    def add_vehicle(self, vehicle):
        spot = self.find_available_spot(vehicle.vehicle_type)
        if spot:
            spot.assign_vehicle(vehicle)
            self.occupied_count += 1
            return f"Vehicle {vehicle.license_plate} parked at spot {spot.spot_id}."
        return "No available spot for this vehicle."

    def remove_vehicle(self, vehicle):
        for spot in self.parking_spots:
            if spot.vehicle == vehicle:
                spot.remove_vehicle()
                self.occupied_count -= 1
                return f"Vehicle {vehicle.license_plate} removed from spot {spot.spot_id}."
        return "Vehicle not found."

    def is_full(self):
        return self.occupied_count == self.capacity

    def get_available_spots(self):
        return len([spot for spot in self.parking_spots if spot.is_empty()])


# Example Usage:
parking_lot = ParkingLot(10)
vehicle1 = Vehicle("XYZ123", "compact")
vehicle2 = Vehicle("ABC456", "regular")

print(parking_lot.add_vehicle(vehicle1))  # Vehicle XYZ123 parked at spot 0.
print(parking_lot.add_vehicle(vehicle2))  # Vehicle ABC456 parked at spot 1.
print(parking_lot.remove_vehicle(vehicle1))  # Vehicle XYZ123 removed from spot 0.
