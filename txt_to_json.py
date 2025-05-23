import json
import sys

number: int = 0
empty_list: list = []
line: str

with open("./dict.txt", "r", encoding="utf-8") as file:
    text_content = file.readlines()
    for line in text_content:
        print(line, number)
        item = line.strip().split(" ")
        empty_list.append({"post": item[0], "meaning": item[1]})
        number += 1

with open("post.json", "w", encoding="utf=8") as jsoon_file:
    json.dump(empty_list, jsoon_file, ensure_ascii=False, indent=4)