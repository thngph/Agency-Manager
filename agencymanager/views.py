from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from rest_framework import viewsets

@login_required(login_url='login')
def index(request):
    if request.method == 'GET':
        # <view logic>
        return redirect('tiepnhan')

@login_required(login_url='login')
def tiepnhan(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, '1-tiepnhandaily.html')


@login_required(login_url='login')
def nhaphang(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, '2-lapphieunhaphang.html')


@login_required(login_url='login')
def xuathang(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, '3-lapphieuxuathang.html')


@login_required(login_url='login')
def thutien(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, '4-lapphieuthutien.html')


@login_required(login_url='login')
def tracuu(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, '5-tracuu.html')