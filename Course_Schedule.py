from typing import List

class Course:
    def __init__(self, course_id: int, prerequisites: List[int] = None):
        self.course_id = course_id
        self.prerequisites = prerequisites if prerequisites else []

class CourseScheduler:
    def __init__(self, courses: List[Course]):
        self.graph = {course.course_id: course for course in courses}  # Store Course objects

    def find_course_order(self) -> List[int]:
        visiting, visited = set(), set()
        order = []

        def dfs(course_id):
            if course_id in visiting:
                return False  # Cycle detected
            if course_id in visited:
                return True  # Already processed

            visiting.add(course_id)
            for pre in self.graph[course_id].prerequisites:  # Access prerequisites directly
                if not dfs(pre):
                    return False  # Cycle detected

            visiting.remove(course_id)
            visited.add(course_id)
            order.append(course_id)  # Add after processing dependencies
            return True

        for course_id in self.graph:
            if course_id not in visited:
                if not dfs(course_id):
                    return []  # Cycle detected

        return order  # No need to reverse as the order is already correct

# Example Usage
courses = [
    Course(0),
    Course(1, [0]),
    Course(2, [0]),
    Course(3, [1, 2])
]

scheduler = CourseScheduler(courses)
print(scheduler.find_course_order())  # Output: [0, 1, 2, 3] or another valid order
