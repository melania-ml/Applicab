def exception_payload(data, message, status):
    temp_custom_failed = {
        "data": data,
        "message": message,
        "success": False,
        "status": status
    }
    return temp_custom_failed


class ResponseInfo:

    def __init__(self, data, message, success, status):
        self.data = data
        self.message = message
        self.success = success
        self.status = status

    def errors_payload(self):
        # if error in payload
        if 'error' in self.data:
            self.message = self.data['error']
            self.data = {}

        temp_custom_failed = {
            "data": self.data,
            "message": self.message,
            "success": False,
            "status": self.status
        }
        return temp_custom_failed

    def success_payload(self):
        # if error in payload
        if 'error' in self.data:
            self.message = self.data['error']
            self.data = {}

        temp_custom_success = {
            "data": self.data,
            "message": self.message,
            "success": self.success,
            "status": self.status
        }
        return temp_custom_success
