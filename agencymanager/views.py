from django.http import HttpResponse
from django.shortcuts import render

from django.views.generic import TemplateView
from rest_framework import viewsets

def index(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, 'index.html')