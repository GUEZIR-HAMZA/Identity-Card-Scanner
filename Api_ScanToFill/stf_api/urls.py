from django.urls import path
from .views import upload_and_process_image

urlpatterns = [

    path('upload_and_process_image/', upload_and_process_image, name='upload_and_process_image'),
]