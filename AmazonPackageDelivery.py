import random
from collections import defaultdict

class Locker:
    def __init__(self, locker_id, size):
        self.locker_id = locker_id
        self.size = size
        self.occupied_by = None

    def occupy(self, package_id):
        self.occupied_by = package_id

    def release(self):
        self.occupied_by = None

class Package:
    def __init__(self, package_id, dimensions):
        self.package_id = package_id
        self.dimensions = dimensions
        self.locker_id = None
        self.code = None

class LockerManager:
    def __init__(self):
        self.lockers = defaultdict(list)
        self.packages = {}
        self.categories = [10, 20, 30]

    def add_locker(self, locker):
        self.lockers[max(locker.size)].append(locker)

    def find_locker(self, package):
        for size in self.categories:
            if max(package.dimensions) <= size:
                return next((locker for locker in self.lockers[size] if not locker.occupied_by), None)
        return None

    def allocate_locker(self, package):
        if locker := self.find_locker(package):
            locker.occupy(package.package_id)
            package.locker_id, package.code = locker.locker_id, self.generate_code()
            self.packages[package.package_id] = package
            return package.code, locker.locker_id
        return None

    def release_locker(self, locker_id):
        for size in self.lockers:
            for locker in self.lockers[size]:
                if locker.locker_id == locker_id:
                    locker.release()
                    return True
        return False

    @staticmethod
    def generate_code():
        return "".join(random.choices('ABCDEF1234', k=6))

class UserInterface:
    def __init__(self, locker_manager):
        self.locker_manager = locker_manager

    def pickup_package(self, code):
        for package in self.locker_manager.packages.values():
            if package.code == code:
                locker_id = package.locker_id
                self.locker_manager.release_locker(locker_id)
                del self.locker_manager.packages[package.package_id]
                return f"✅ Package {package.package_id} picked up from Locker {locker_id}."
        return "❌ Invalid code."

class DeliveryInterface:
    def __init__(self, locker_manager):
        self.locker_manager = locker_manager

    def place_package(self, package_id, dimensions):
        package = Package(package_id, dimensions)
        if result := self.locker_manager.allocate_locker(package):
            code, locker_id = result
            return f"📦 Package {package_id} placed in Locker {locker_id}. Pickup Code: {code}"
        return "🚫 No available locker."



# 🔹 MAIN EXECUTION (Ensuring a Single LockerManager Instance)
locker_manager = LockerManager()  # 🔥 SINGLE INSTANCE of LockerManager
user_interface = UserInterface(locker_manager)
delivery_interface = DeliveryInterface(locker_manager)

# Adding lockers of different sizes (Persistent State)
locker_manager.add_locker(Locker("L1", (10, 10, 10)))
locker_manager.add_locker(Locker("L2", (20, 20, 20)))
locker_manager.add_locker(Locker("L3", (30, 30, 30)))

# Placing packages
print(delivery_interface.place_package("P1", (8, 8, 8)))  # Should go to 10x10x10 locker
print(delivery_interface.place_package("P2", (12, 12, 12)))  # Should go to 20x20x20 locker
print(delivery_interface.place_package("P3", (25, 25, 25)))  # Should go to 30x30x30 locker

# Attempting to pick up a package (Invalid case)
print(user_interface.pickup_package("INVALID_CODE"))  # Expected: ❌ Invalid code

# Picking up a valid package (Replace with actual generated code from above)
print(user_interface.pickup_package("ACTUAL_GENERATED_CODE_HERE"))
