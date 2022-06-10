from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from django.views.generic import TemplateView
from rest_framework import viewsets
from django.contrib.auth.models import User


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
    loaidaily_obj = LoaiDaiLy.objects.all()
    context= {"daily": daily_obj, "quan": quan_obj, "loaidaily": loaidaily_obj}
    if request.method == 'POST':
        form=TiepNhan(request.POST)
        print(form.data)
        if form.is_valid():
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
            context=form.data
            return redirect(chitietnhaphang, MaNhaCC = context['MaNCC'], NgayNhap = context['NgayNhap'], id = form.instance.MaPhieuNhapHang, sum=0)
        else:
            context = {"nhacungcap": NhaCungCap.objects.all()}
            return render(request, '2-lapphieunhaphang.html', context)
    if request.method == 'GET':
        context = {"nhacungcap": NhaCungCap.objects.all()}
        return render(request, '2-lapphieunhaphang.html', context)

@login_required(login_url='login')
def chitietnhaphang(request, MaNhaCC, NgayNhap, id, sum):
    sum=0
    ctnhaphang = ChiTietPhieuNhapHang.objects.filter(MaPhieuNhapHang=id)
    for item in ctnhaphang:
        sum= sum+ item.ThanhTien
    if request.method == 'POST':
        if 'phieumoi' in request.POST:
            print("CO PHIEU MOI")
            data = request.POST
            print(data)
            check_ctpn = ChiTietPhieuNhapHang.objects.filter(MaPhieuNhapHang=id,MaMatHang=data['MaMatHang'])
            if (check_ctpn):
                check_ctpn[0].SoLuong=check_ctpn[0].SoLuong+int(data['SoLuong'])
                check_ctpn[0].ThanhTien= check_ctpn[0].ThanhTien + int(data['DonGia'])*int(data['SoLuong'])
                check_ctpn[0].save()
            else:
                ctphieunhap = ChiTietPhieuNhapHang(MaPhieuNhapHang=PhieuNhapHang.objects.get(MaPhieuNhapHang=id), MaMatHang=MatHang.objects.get(MaMatHang=data['MaMatHang']),SoLuong=data['SoLuong'],DonGia=data['DonGia'], ThanhTien=int(data['DonGia'])*int(data['SoLuong']))
                ctphieunhap.save()
            mathang = MatHang.objects.get(MaMatHang= request.POST['MaMatHang'])
            mathang.SoLuongTon = mathang.SoLuongTon + int(data['SoLuong'])
            mathang.GiaNhap = int(request.POST['DonGia'])
            mathang.save()
            ctnhaphang = ChiTietPhieuNhapHang.objects.filter(MaPhieuNhapHang=id)
            return redirect(chitietnhaphang, MaNhaCC= MaNhaCC, NgayNhap= NgayNhap, id = id, sum=sum)
            
        if 'delete' in request.POST:
            print("CO DELETE")
            print(request.POST)
            id_delete= int(request.POST['xoaphieu'])
            
            phieuxoa = ChiTietPhieuNhapHang.objects.get(MaChiTietPhieuNhapHang=id_delete)
            mathang= MatHang.objects.get(TenMatHang= request.POST['MaMatHang'])
            mathang.SoLuongTon= mathang.SoLuongTon- phieuxoa.SoLuong
            mathang.save()
            sum = sum - phieuxoa.ThanhTien
            ChiTietPhieuNhapHang.objects.get(MaChiTietPhieuNhapHang=id_delete).delete()
            print("da xoa")
            ctnhaphang = ChiTietPhieuNhapHang.objects.filter(MaPhieuNhapHang=id).select_related('MaMatHang')
            tenmathang = MatHang.objects.all()
            dvt = DVT.objects.all()
            context= {"MaNhaCC": MaNhaCC, "NgayNhap": NgayNhap, "id": id, "ctnhaphang": ctnhaphang, "tenmathang": tenmathang, "sum": sum}
            return render(request, '2-chitietnhaphang.html', context)
            
        if 'xoatatca' in request.POST:            
            ctnhaphang = ChiTietPhieuNhapHang.objects.filter(MaPhieuNhapHang=id).select_related('MaMatHang')
            print(ctnhaphang)
            for item in ctnhaphang:
                mathang= MatHang.objects.get(TenMatHang = item.MaMatHang)
                mathang.SoLuongTon = mathang.SoLuongTon - item.SoLuong
                mathang.save()
            print("id:", id)
            for item in ctnhaphang:
                item.delete()
            
            phieunhap= PhieuNhapHang.objects.get(MaPhieuNhapHang = id)
            phieunhap.delete()
            print(nhaphang)
            
            return redirect('/nhaphang/')
        if 'luu' in request.POST:
            phieunhap= PhieuNhapHang.objects.get(MaPhieuNhapHang = id)
            phieunhap.TongTien= int(request.POST['save'])
            phieunhap.save()
            tenmathang = MatHang.objects.all()
            context= {"MaNhaCC": MaNhaCC, "NgayNhap": NgayNhap, "id": id, "ctnhaphang": ctnhaphang, "tenmathang": tenmathang,  "sum": sum,"success": True}
            return render(request, '2-chitietnhaphang.html', context)


    if request.method == 'GET':
        print("KHONG CO GI HET")        
        tenmathang = MatHang.objects.all()
        context= {"MaNhaCC": MaNhaCC, "NgayNhap": NgayNhap, "id": id, "ctnhaphang": ctnhaphang, "tenmathang": tenmathang,  "sum": sum}
    return render(request, '2-chitietnhaphang.html', context)


@login_required(login_url='login')
def xuathang(request):
    if request.method == 'POST':
        if 'phieumoi' in request.POST:
            form= XuatHang(request.POST)
            if form.is_valid():            
                form.save()
                context = form.data
                return redirect(chitietxuathang, MaDaiLy= context['MaDaiLy'], NgayXuat= context['NgayXuat'], id = form.instance.MaPhieuXuatHang)
            else:
                daily = DaiLy.objects.all()
                context = {"daily": daily}
                return render(request, '3-lapphieuxuathang.html', context)
        
        
    elif request.method == 'GET':
        daily = DaiLy.objects.all()
        context = {"daily": daily}
        return render(request, '3-lapphieuxuathang.html', context)


@login_required(login_url='login')
def chitietxuathang(request,MaDaiLy,NgayXuat,id):
    ctxuathang1 = ChiTietPhieuXuatHang.objects.filter(MaPhieuXuatHang=id).select_related('MaMatHang')
    s=0
    for item in ctxuathang1:
        s = s + item.ThanhTien
    if request.method == 'GET':
        ctxuathang = ChiTietPhieuXuatHang.objects.filter(MaPhieuXuatHang=id).select_related('MaMatHang')
        tongtien = sum(ctxuathang.values_list('ThanhTien', flat=True))
        print(tongtien)
        tenmathang = MatHang.objects.all()
        context = {"daily": MaDaiLy, "ngayxuat": NgayXuat, "id": id, "ctxuathang": ctxuathang, "tenmathang": tenmathang, "tongtien": tongtien}
        return render(request, '3-chitietxuathang.html', context)
    if request.method == 'POST':
        if 'phieumoi' in request.POST:
            data = request.POST
            check_ctpx = ChiTietPhieuXuatHang.objects.filter(MaPhieuXuatHang=id,MaMatHang=data['MaMatHang'])
            if (check_ctpx):
                check_ctpx[0].SoLuong=check_ctpx[0].SoLuong+int(data['SoLuong'])
                check_ctpx[0].ThanhTien= check_ctpx[0].ThanhTien + int(data['DonGia'])*int(data['SoLuong'])
                check_ctpx[0].save()
            else:
                ctphieuxuat = ChiTietPhieuXuatHang(MaPhieuXuatHang=PhieuXuatHang.objects.get(MaPhieuXuatHang=id), MaMatHang=MatHang.objects.get(MaMatHang=data['MaMatHang']),SoLuong=data['SoLuong'],DonGia=data['DonGia'], ThanhTien=int(data['DonGia'])*int(data['SoLuong']))                
                ctphieuxuat.save()
            mathang= MatHang.objects.get(MaMatHang= request.POST['MaMatHang'])    
            mathang.SoLuongTon = mathang.SoLuongTon - int(data['SoLuong'])
            mathang.save()
            return redirect(chitietxuathang, MaDaiLy= MaDaiLy, NgayXuat= NgayXuat, id = id)
        if 'delete' in request.POST:
            print("CO DELETE")
            print(request.POST)
            id_delete= int(request.POST['xoaphieu'])
            phieuxoa= ChiTietPhieuXuatHang.objects.get(MaChiTietPhieuXuatHang= id_delete)
            mathang= MatHang.objects.get(TenMatHang= request.POST['MaMatHang'])
            mathang.SoLuongTon= mathang.SoLuongTon + phieuxoa.SoLuong
            mathang.save()
            ChiTietPhieuXuatHang.objects.get(MaChiTietPhieuXuatHang= id_delete).delete()
            print("da xoa")

            ctxuathang= ChiTietPhieuXuatHang.objects.filter(MaPhieuXuatHang= id)
            tenmathang = MatHang.objects.all()
            dvt = DVT.objects.all()
            context= {"MaDaiLy": MaDaiLy, "NgayXuat": NgayXuat, "id": id, "ctxuathang": ctxuathang, "tenmathang": tenmathang}

        if 'xoatatcaphieu' in request.POST:
            ctxuathang= ChiTietPhieuXuatHang.objects.filter(MaPhieuXuatHang= id)
            print("XXx")
            for item in ctxuathang:
                mathang= MatHang.objects.get(TenMatHang= item.MaMatHang)
                mathang.SoLuongTon= mathang.SoLuongTon + item.SoLuong
                mathang.save()
            PhieuXuatHang.objects.get(MaPhieuXuatHang=id).delete()
            
            return redirect('/xuathang/')
        return render(request, '3-chitietxuathang.html', context)
            



@login_required(login_url='login')
def delete_chitietnhaphang(request,MaNhaCC, NgayNhap, id):
    if request.method == 'GET':
        phieunhap = PhieuNhapHang.objects.get(MaPhieuNhapHang=id)
        phieunhap.delete()
        return redirect(reverse('nhaphang'))

@login_required(login_url='login')
def delete_chitietxuathang(request,MaDaiLy,NgayXuat,id):
    if request.method == 'GET':
        phieuxuat = PhieuXuatHang.objects.get(MaPhieuXuatHang=id)
        phieuxuat.delete()
        return redirect(reverse('xuathang'))

@login_required(login_url='login')
def thutien(request):    
    context = None
    
    if request.method == 'POST':
        if 'tracuu' in request.POST:    
            id= request.POST['MaDaiLy']
            daily_obj= DaiLy.objects.filter(MaDaiLy= id)
            if daily_obj:
                context= {"daily": daily_obj, "flag": True}
                return render(request, '4-lapphieuthutien.html', context)           
            else:
                context= {"daily": daily_obj, "flag": False}
                return render(request, '4-lapphieuthutien.html', context)
        if 'phieumoi' in request.POST:
            dailythutien= DaiLy()
            dailythutien = DaiLy.objects.get(MaDaiLy=  request.POST['MaDaiLy'])
            if (int(request.POST['SoTienThu']) <= dailythutien.SoTienNo):
                PhieuThu = PhieuThuTien()
                PhieuThu.NgayThuTien= request.POST['NgayThuTien']
                PhieuThu.SoTienThu= request.POST['SoTienThu']
                PhieuThu.MaDaiLy= DaiLy.objects.get(MaDaiLy=  request.POST['MaDaiLy'])
                PhieuThu.save()
                dailythutien.SoTienNo= dailythutien.SoTienNo - int(request.POST['SoTienThu'])
                dailythutien.save()
            
    context= {"flag": True}
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
    if request.user.is_superuser:
        context = {"status":"Admin"}
    else:
        context = {"status":"Staff"}
    if request.method == 'GET':
        return render(request, 'trangcanhan.html', context)
    if request.method == 'POST':
        user = User.objects.get(id=request.user.id)
        old_pwd = request.POST['pwd']
        pwd_1 = request.POST['pwd1']
        pwd_2 = request.POST['pwd2']
        if user.check_password(old_pwd) and pwd_2 == pwd_1:
            user.set_password(pwd_1)
            user.save()
            context.update({"message": "success"})
            print("success")
            return render(request, 'trangcanhan.html', context)
        else:
            context.update({"message": "failed"})
            print("failed")
            return render(request, 'trangcanhan.html', context)
    
@login_required(login_url='login')
def danhmuc(request):
    if request.method == 'GET':
        context = {"danhmuc": MatHang.objects.all()}
        return render(request, 'danhmuchang.html', context)