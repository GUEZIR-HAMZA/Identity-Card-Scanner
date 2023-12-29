# ocr/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST, require_GET
from PIL import Image
import pytesseract


@csrf_exempt
@require_POST
def upload_image(request):
    image_file = request.FILES.get('image')

    if image_file:
        processed_data = process_image(image_file)
        return JsonResponse({'extracted_text': processed_data})

    return JsonResponse({'error': 'No image file provided'}, status=400)


@require_GET
def get_extracted_text(request):
    return JsonResponse({'message': 'No data stored. Upload an image first.'})


def process_image(image_file):
    # Use Tesseract OCR to extract text
    extracted_text = pytesseract.image_to_string(Image.open(image_file))
    return extracted_text
