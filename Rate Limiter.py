from collections import deque
from datetime import datetime, timedelta

class RateLimiter:
    def __init__(self, log_file, max_requests, time_window):
        self.log_file = log_file
        self.max_requests = max_requests
        self.time_window = timedelta(seconds=time_window)
        self.user_requests = {}

    def process_logs(self):
        """Reads log file and stores user request timestamps."""
        with open(self.log_file, 'r') as file:
            for line in file:
                user, timestamp = line.strip().split(", ")
                timestamp = datetime.fromisoformat(timestamp)
                
                if user not in self.user_requests:
                    self.user_requests[user] = deque()
                
                self.user_requests[user].append(timestamp)

    def can_make_request(self, user, current_time):
        """Checks if the user can make another request based on rate limits."""
        if user not in self.user_requests:
            return True
        
        request_queue = self.user_requests[user]

        # Remove old requests outside the time window
        while request_queue and request_queue[0] < current_time - self.time_window:
            request_queue.popleft()

        return len(request_queue) < self.max_requests

# Example Usage
log_file = "api_logs.txt"
rate_limiter = RateLimiter(log_file, max_requests=3, time_window=5)  # 3 requests per 5 seconds
rate_limiter.process_logs()

# Checking if User1 can make a request at a specific time
current_time = datetime.fromisoformat("2024-02-18T12:00:08")
print(rate_limiter.can_make_request("User1", current_time))  # Output: True or False
