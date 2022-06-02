from django import http
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from rest_framework import viewsets


from agencyapi.forms import ThuTienForm, TiepNhan, PhieuThuTien
from agencyapi.models import DaiLy, LoaiDaiLy, PhieuThuTien


@login_required(login_url='login')
def index(request):
    if request.method == 'GET':
        # <view logic>
        return redirect('tiepnhan')

@login_required(login_url='login')
def tiepnhan(request):    
    daily_obj = DaiLy.objects.all()
    context= {"daily": daily_obj}
    if request.method == 'POST':
        form=TiepNhan(request.POST)
        if form.is_valid():
            print(form.data)
            form.save()            
            return render(request, '1-tiepnhandaily.html', context)
    
    return render(request, '1-tiepnhandaily.html', context)

@login_required(login_url='login')
def nhaphang(request):
    if request.method == 'POST':
        # <view logic>
        pass
    return render(request, '2-lapphieunhaphang.html')


@login_required(login_url='login')
def xuathang(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, '3-lapphieuxuathang.html')


@login_required(login_url='login')
def thutien(request):
    if request.method == 'POST':
        form= ThuTienForm(request.POST)
        if form.is_valid():
            print('TRUE')
            daily= DaiLy.objects.get()
            a= PhieuThuTien(MaDaiLy = form.data['TenDaiLy'], ngayThuTien = form.data['NgayThuTien'], SoTienThu = form.data['SoTienThu'])
            a.save()
            return render(request, '4-lapphieuthutien.html')
            
            
    return render(request, '4-lapphieuthutien.html')


@login_required(login_url='login')
def tracuu(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, '5-tracuu.html')