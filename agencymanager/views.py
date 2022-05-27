from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from rest_framework import viewsets

@login_required(login_url='login')
def index(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, '1-tiepnhandaily.html')