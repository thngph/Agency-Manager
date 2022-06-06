from pickle import FALSE, TRUE
from cv2 import Mat
from django import http
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
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
def chitietnhaphang(request, context):
    if request.method == 'POST':
        if "themphieunhap" in request.POST:
            phieunhap = PhieuNhapHang.objects.all().filter(NgayNhap= context['ngaynhap'])    
            phieunhap = phieunhap.filter(MaNCC=context['MaNCC'])
            ctnhaphang= models.ChiTietPhieuNhapHang()
            ctnhaphang.MaPhieuNhapHang= phieunhap[0]
            ctnhaphang.DonGia= request.POST['DonGia']
            ctnhaphang.MaMatHang= MatHang.objects.get(MaMatHang=request.POST['Mamathang'])
            ctnhaphang.SoLuong= request.POST['SoLuong']
            ctnhaphang.DonGia= request.POST['DonGia']

            ctnhaphang.save()
            return render(request, '2-chitietnhaphang.html', context)
            
    return render(request, '2-chitietnhaphang.html', context)

@login_required(login_url='login')
def nhaphang(request):
    id=None
    if request.method == 'POST':
        form= NhapHang(request.POST)
        if form.is_valid():
            phieunhap_check= PhieuNhapHang.objects.all().filter(MaNCC= form.data['MaNCC']) 
            phieunhap_check= phieunhap_check.filter(NgayNhap=form.data['NgayNhap'])
            if phieunhap_check:
                pass
            else:        
                form.save()
            context={"ngaynhap": request.POST['NgayNhap'], "MaNhaCC":  request.POST['MaNCC']}
            return chitietnhaphang(request, context)
    print(False)
    return render(request, '2-lapphieunhaphang.html')





@login_required(login_url='login')
def xuathang(request):
    if request.method == 'POST':
        form= XuatHang(request.POST)
        if form.is_valid():            
            form.save(commit=False)
            context = form.data
            return redirect(chitietxuathang, MaDaiLy= context['MaDaiLy'], NgayXuat= context['NgayXuat'])
        else:
            daily = DaiLy.objects.all()
        context = {"daily": daily}
        return render(request, '3-lapphieuxuathang.html', context)
    if request.method == 'GET':
        daily = DaiLy.objects.all()
        context = {"daily": daily}
        return render(request, '3-lapphieuxuathang.html', context)


@login_required(login_url='login')
def chitietxuathang(request,MaDaiLy,NgayXuat):
    if request.method == 'GET':
        context = {"daily": MaDaiLy, "ngayxuat": NgayXuat}
        return render(request, '3-chitietxuathang.html', context)


@login_required(login_url='login')
def thutien(request):    
    context = None
    
    if request.method == 'POST':

        print(request.POST)
        
        if 'tracuu' in request.POST:
            print("CO TRA CUU")
            id= request.POST['MaDaiLy']
            daily_obj= DaiLy.objects.filter(MaDaiLy= id)
            if daily_obj:
                context= {"daily": daily_obj, "flag": TRUE}
                return render(request, '4-lapphieuthutien.html', context)           
            else:
                context= {"daily": daily_obj, "flag": FALSE}
                return render(request, '4-lapphieuthutien.html', context)
        if 'phieumoi' in request.POST:
            print("Co PHIEU MOI")
            phieuthu= PhieuThuTien()
            
            phieuthu.SoTienThu=request.POST['SoTienThu']
            phieuthu.MaDaiLy=DaiLy.objects.get(MaDaiLy=request.POST['MaDaiLy1'])
            phieuthu.NgayThuTien=request.POST['NgayThuTien']                
            phieuthu.save()
            return render(request, '4-lapphieuthutien.html', {"flag": TRUE})
              

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