# ocr/urls.py
from django.urls import path
from .views import upload_image, get_extracted_text

urlpatterns = [
    path('upload_image/', upload_image, name='upload_image'),
    path('get_extracted_text/', get_extracted_text, name='get_extracted_text'),
]
