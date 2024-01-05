import requests

def rapid_api(image_file):

    url = "https://document-ocr1.p.rapidapi.com/idr"

    files = {"inputimage": open(image_file, 'rb')}

    print("Uploading image to RapidAPI...")
    headers = {
        "X-RapidAPI-Key": "2b507998b9msh28fded5e40e7205p1c3733jsn6ae0225f8373",
        "X-RapidAPI-Host": "document-ocr1.p.rapidapi.com"
    }

    response = requests.post(url, files=files, headers=headers)

    return response.json()