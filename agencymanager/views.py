from pickle import FALSE, TRUE
from django import http
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.views.generic import TemplateView
from rest_framework import viewsets


from agencyapi.forms import *
from agencyapi.models import *


@login_required(login_url='login')
def index(request):
    if request.method == 'GET':
        # <view logic>
        return redirect('tiepnhan')


@login_required(login_url='login')
def tiepnhan(request):    
    daily_obj = DaiLy.objects.all()
    quan_obj = Quan.objects.all()
    context= {"daily": daily_obj, "quan": quan_obj}
    if request.method == 'POST':
        form=TiepNhan(request.POST)
        if form.is_valid():
            print(TRUE)
            form.save()            
            return render(request, '1-tiepnhandaily.html', context)
        else:
            print(form.errors)
    print('FALSE')
    return render(request, '1-tiepnhandaily.html', context)


@login_required(login_url='login')
def nhaphang(request):
    if request.method == 'POST':
        form= NhapHang(request.POST)
        if form.is_valid():            
            form.save()
            print(True)
            return render(request, '2-chitietnhaphang.html')
    print(False)    
    return render(request, '2-lapphieunhaphang.html')


@login_required(login_url='login')
def chitietnhaphang(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, '2-chitietnhaphang.html')



@login_required(login_url='login')
def xuathang(request):
    if request.method == 'POST':
        form= XuatHang(request.POST)
        if form.is_valid():            
            form.save()
            context = form.data
            return redirect(chitietxuathang, MaDaiLy= context['MaDaiLy'], NgayXuat= context['NgayXuat'], id = form.instance.MaPhieuXuatHang)
        else:
            daily = DaiLy.objects.all()
        context = {"daily": daily}
        return render(request, '3-lapphieuxuathang.html', context)
    if request.method == 'GET':
        daily = DaiLy.objects.all()
        context = {"daily": daily}
        return render(request, '3-lapphieuxuathang.html', context)


@login_required(login_url='login')
def chitietxuathang(request,MaDaiLy,NgayXuat,id):
    if request.method == 'GET':
        ctxuathang = ChiTietPhieuXuatHang.objects.filter(MaPhieuXuatHang=id)
        context = {"daily": MaDaiLy, "ngayxuat": NgayXuat, "id": id, "ctxuathang": ctxuathang}
        return render(request, '3-chitietxuathang.html', context)
    if request.method == 'POST':
        data = request.POST
        check_ctpx = ChiTietPhieuXuatHang.objects.filter(MaPhieuXuatHang=id,MaMatHang=data['MaMatHang'])
        if (check_ctpx):
            check_ctpx[0].SoLuong=check_ctpx[0].SoLuong+int(data['SoLuong'])
            check_ctpx[0].ThanhTien= check_ctpx[0].ThanhTien + int(data['DonGia'])*int(data['SoLuong'])
            check_ctpx[0].save()
        else:
            ctphieuxuat = ChiTietPhieuXuatHang(MaPhieuXuatHang=PhieuXuatHang.objects.get(MaPhieuXuatHang=id), MaMatHang=MatHang.objects.get(MaMatHang=data['MaMatHang']),SoLuong=data['SoLuong'],DonGia=data['DonGia'], ThanhTien=int(data['DonGia'])*int(data['SoLuong']))
            ctphieuxuat.save()
        ctxuathang = ChiTietPhieuXuatHang.objects.filter(MaPhieuXuatHang=id)
        return redirect(chitietxuathang, MaDaiLy= MaDaiLy, NgayXuat= NgayXuat, id = id)

@login_required(login_url='login')
def delete_chitietxuathang(request,MaDaiLy,NgayXuat,id):
    if request.method == 'GET':
        phieuxuat = PhieuXuatHang.objects.get(MaPhieuXuatHang=id)
        phieuxuat.delete()
        daily = DaiLy.objects.all()
        context = {"daily": daily}
        return redirect(reverse('xuathang'))

@login_required(login_url='login')
def thutien(request):    
    context = None
    
    if request.method == 'POST':
        id= request.POST['MaDaiLy']
        daily_obj= DaiLy.objects.filter(MaDaiLy= id)
        if daily_obj:
            context= {"daily": daily_obj, "flag": TRUE}
            return render(request, '4-lapphieuthutien.html', context)           
        else:
            context= {"daily": daily_obj, "flag": FALSE}
            return render(request, '4-lapphieuthutien.html', context)
    #return MA DAI LY SAI
    context= {"flag": TRUE}
    return render(request, '4-lapphieuthutien.html', context)


@login_required(login_url='login')
def tracuu(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, '5-tracuu.html')

@login_required(login_url='login')
def doanhso(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, 'baocaodoanhso.html')

@login_required(login_url='login')
def congno(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, 'baocaocongno.html')

@login_required(login_url='login')
def quydinh(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, 'capnhatquydinh.html')

@login_required(login_url='login')
def profile(request):
    if request.method == 'GET':
        # <view logic>
        return render(request, 'trangcanhan.html')

@login_required(login_url='login')
def logout(request):
	logout(request)
	return redirect("login")