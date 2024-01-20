FROM python:3.12.1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirement.txt .

RUN pip install -r requirement.txt

COPY . .    

EXPOSE 8000
CMD ["python3","manage.py","runserver"]