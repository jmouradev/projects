import csv

# html_output = ""
# names = []

# with open("file.csv", "r", encoding="utf-8-sig") as data_file:
#     csv_data = csv.DictReader(data_file)

#     for item in csv_data:
#         print(item)


def read_csv_dict(filename):
    names = []
    with open(filename, "r", encoding="utf-8-sig") as data_file:
        csv_data = csv.DictReader(data_file)

        # We don't want first line of bad data
        next(csv_data)

        for line in csv_data:
            if line["FirstName"] == "No Reward":
                break
            names.append(f"{line['FirstName']} {line['LastName']}")
    return names


def read_csv(filename):
    names = []
    with open(filename, "r") as data_file:
        csv_data = csv.reader(data_file)

        next(csv_data)
        next(csv_data)

        for line in csv_data:
            if line[0] == "No Reward":
                break
            names.append(f"{line[0]} {line[1]}")
    return names


filename = "file.csv"
html_output = ""
# names = read_csv_dict(filename)
names = read_csv(filename)

html_output += (
    f"<p>There are currently {len(names)} public contributors. Thank You!</p>"
)
html_output += "\n<ul>"

for name in names:
    html_output += f"\n\t<li>{name}</li>"

html_output += "\n</ul>"
print(html_output)

