class Node:
    def __init__(self, name, is_dir=False):
        self.name = name
        self.is_dir = is_dir
        self.children = {}  # Directory: name -> Node
        self.data = ""  # Only for files

class FileSystem:
    def __init__(self):
        self.root = Node("/", is_dir=True)  # Root directory

    def _get_node(self, path):
        parts = path.strip("/").split("/")
        curr = self.root
        for part in parts:
            if part not in curr.children:
                return None
            curr = curr.children[part]
        return curr

    def mkdir(self, path):
        parts = path.strip("/").split("/")
        curr = self.root
        for part in parts:
            if part not in curr.children:
                curr.children[part] = Node(part, is_dir=True)
            curr = curr.children[part]

    def create_file(self, path):
        parts = path.strip("/").split("/")
        filename = parts.pop()
        parent = self._get_node("/" + "/".join(parts))
        if not parent or not parent.is_dir:
            print(f"Invalid path: {path}")
            return
        parent.children[filename] = Node(filename, is_dir=False)

    def write_file(self, path, data):
        file = self._get_node(path)
        if not file or file.is_dir:
            print(f"Invalid file: {path}")
            return
        file.data = data

    def read_file(self, path):
        file = self._get_node(path)
        if not file or file.is_dir:
            print(f"File not found: {path}")
            return
        print(f"Reading '{path}': {file.data}")

    def find(self, name, node=None, path=""):
        if node is None:
            node = self.root
        if node.name == name:
            print(f"Found at: {path or '/'}")
        for child in node.children.values():
            self.find(name, child, f"{path}/{child.name}")

# Test the tree-based file system
fs = FileSystem()
fs.mkdir("/home/user")
fs.create_file("/home/user/file1.txt")
fs.write_file("/home/user/file1.txt", "Hello, Linux!")
fs.read_file("/home/user/file1.txt")
fs.find("file1.txt")
fs.find("user")
