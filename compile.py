import os

# Specify the directory to search for .js files
src_directory = 'src'

# Specify the output file name
output_file = 'compiled_js.txt'

# Initialize an empty list to store the file contents
file_contents = []

# Traverse the src directory recursively
for root, dirs, files in os.walk(src_directory):
    for file in files:
        if file.endswith('.js'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r') as f:
                content = f.read()
                file_contents.append(f'<file path="{file_path}">\n{content}\n</file>\n')

# Write the file contents to the output file
with open(output_file, 'w') as f:
    f.write('\n'.join(file_contents))

print(f'JavaScript files compiled successfully. Output file: {output_file}')