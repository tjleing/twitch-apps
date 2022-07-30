from os import listdir

only_valid_names = lambda name: name[0] != '.'

print("let filenames = ")
print(filter(only_valid_names, listdir("img/")))
print("export {filenames};")