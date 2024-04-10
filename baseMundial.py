import json

def baseMundial():

    with open ("baseMundial.json") as bjson:
        base= json.load(bjson)

    return base

