import json

def baseMundial():

    with open ("baseMundial.json") as bjson:
        base= json.load(bjson)

    return base

def baseCopamerica():
    with open ("base_copam.json") as bjson:
        base= json.load(bjson)

    return base

def baseLali():
    with open ("baseLali.json") as bjson:
        base= json.load(bjson)

    return base

def baseFutarg():
    with open ("baseFutarg.json") as bjson:
        base= json.load(bjson)

    return base