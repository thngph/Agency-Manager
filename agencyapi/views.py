from django.http import HttpResponse
from django.shortcuts import render

from django.views.generic import TemplateView
from rest_framework import viewsets

from .serializers import *
from .models import *

def index(request):
    if request.method == 'GET':
        # <view logic>
        return HttpResponse('Hi xin chao ca nha yeu')

# Create your views here.
class DVTViewSet(viewsets.ModelViewSet):
    queryset = DVT.objects.all()
    serializer_class = DVTSerializer

class BaoCaoDoanhSoViewSet(viewsets.ModelViewSet):
    queryset = BaoCaoDoanhSo.objects.all()
    serializer_class = BaoCaoDoanhSoSerializer

class ChiTietBaoCaoDoanhSoViewSet(viewsets.ModelViewSet):
    queryset = ChiTietBaoCaoDoanhSo.objects.all()
    serializer_class = ChiTietBaoCaoDoanhSoSerializer

class LoaiDaiLyViewSet(viewsets.ModelViewSet):
    queryset = LoaiDaiLy.objects.all()
    serializer_class = LoaiDaiLySerializer

class DaiLyViewSet(viewsets.ModelViewSet):
    queryset = DaiLy.objects.all()
    serializer_class = DaiLySerializer

class MatHangViewSet(viewsets.ModelViewSet):
    queryset = MatHang.objects.all()
    serializer_class = MatHangSerializer

class PhieuNhapHangViewSet(viewsets.ModelViewSet):
    queryset = PhieuNhapHang.objects.all()
    serializer_class = PhieuNhapHangSerializer

class ChiTietPhieuNhapHangViewSet(viewsets.ModelViewSet):
    queryset = ChiTietPhieuNhapHang.objects.all()
    serializer_class = ChiTietPhieuNhapHangSerializer

class PhieuXuatHangViewSet(viewsets.ModelViewSet):
    queryset = PhieuXuatHang.objects.all()
    serializer_class = PhieuXuatHangSerializer

class ChiTietPhieuXuatHangViewSet(viewsets.ModelViewSet):
    queryset = ChiTietPhieuXuatHang.objects.all()
    serializer_class = ChiTietPhieuXuatHangSerializer

class BaoCaoCongNoViewSet(viewsets.ModelViewSet):
    queryset = BaoCaoCongNo.objects.all()
    serializer_class = BaoCaoCongNoSerializer

class PhieuThuTienViewSet(viewsets.ModelViewSet):
    queryset = PhieuThuTien.objects.all()
    serializer_class = PhieuThuTienSerializer

class ThamSoViewSet(viewsets.ModelViewSet):
    queryset = ThamSo.objects.all()
    serializer_class = ThamSoSerializer

class NhaCungCapViewSet(viewsets.ModelViewSet):
    queryset = NhaCungCap.objects.all()
    serializer_class = NhaCungCapSerializer

class LoaiDaiLyViewSet(viewsets.ModelViewSet):
    queryset = LoaiDaiLy.objects.all()
    serializer_class = LoaiDaiLySerializer

class QuanViewSet(viewsets.ModelViewSet):
    queryset = Quan.objects.all()
    serializer_class = QuanSerializer
