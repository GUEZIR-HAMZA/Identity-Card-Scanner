from django.http import JsonResponse
from django.http.multipartparser import MultiPartParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import parser_classes

from stf_api.ocr import rapid_api
from stf_api.models import UploadedImage


@csrf_exempt
@parser_classes([MultiPartParser])
def upload_and_process_image(request):
    if request.method == 'POST':
        # Get the uploaded image from the request
        image_file = request.FILES.get('image')

        if image_file:
            # Save the image to the server (optional, depending on your needs)
            uploaded_image = UploadedImage(image=image_file)
            uploaded_image.save()

            # Call the rapid_api function from ocr.py
            api_response = rapid_api(uploaded_image.image.path)

            # Process the API response
            if api_response:
                # Optionally, you can handle the API response further if needed
                # For simplicity, just returning the response as JSON
                return JsonResponse({'success': True, 'api_response': api_response})
            else:
                return JsonResponse({'success': False, 'error_message': 'API request failed'})

    return JsonResponse({'error': 'Invalid request method'})