class View:
    def __init__(self, id=None):
        self.id = id
        self.children = []

    def add_view(self, view):
        self.children.append(view)

def find_view_by_id(root, target_id):
    if root.id == target_id:
        return root
    for child in root.children:
        found = find_view_by_id(child, target_id)
        if found:
            return found
    return None


# Example usage
root = View("content")
inner = View("inner")
text_view = View("primary_text")

root.add_view(inner)
inner.add_view(text_view)

found = find_view_by_id(root, "primary_text")
print(f"Found primary_text: {found is not None}")  # Output: True