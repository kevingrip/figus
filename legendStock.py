import json

with open ("legends.json","r") as jsonl:
    base = json.load(jsonl)

n=''

for x in base:
    if x["BASE"]>0:
        n+= (x["nombre"]+', ').capitalize()

print(n)