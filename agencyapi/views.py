from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated, IsAdminUser
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
    permission_classes = [IsAuthenticated]

class BaoCaoDoanhSoViewSet(viewsets.ModelViewSet):
    queryset = BaoCaoDoanhSo.objects.all()
    serializer_class = BaoCaoDoanhSoSerializer
    permission_classes = [IsAuthenticated]

class ChiTietBaoCaoDoanhSoViewSet(viewsets.ModelViewSet):
    queryset = ChiTietBaoCaoDoanhSo.objects.all()
    serializer_class = ChiTietBaoCaoDoanhSoSerializer
    permission_classes = [IsAuthenticated]

class LoaiDaiLyViewSet(viewsets.ModelViewSet):
    queryset = LoaiDaiLy.objects.all()
    serializer_class = LoaiDaiLySerializer
    permission_classes = [IsAuthenticated]

class DaiLyViewSet(viewsets.ModelViewSet):
    queryset = DaiLy.objects.all()
    serializer_class = DaiLySerializer
    permission_classes = [IsAuthenticated]

class MatHangViewSet(viewsets.ModelViewSet):
    queryset = MatHang.objects.all()
    serializer_class = MatHangSerializer
    permission_classes = [IsAuthenticated]

class PhieuNhapHangViewSet(viewsets.ModelViewSet):
    queryset = PhieuNhapHang.objects.all()
    serializer_class = PhieuNhapHangSerializer
    permission_classes = [IsAuthenticated]

class ChiTietPhieuNhapHangViewSet(viewsets.ModelViewSet):
    queryset = ChiTietPhieuNhapHang.objects.all()
    serializer_class = ChiTietPhieuNhapHangSerializer
    permission_classes = [IsAuthenticated]

class PhieuXuatHangViewSet(viewsets.ModelViewSet):
    queryset = PhieuXuatHang.objects.all()
    serializer_class = PhieuXuatHangSerializer
    permission_classes = [IsAuthenticated]

class ChiTietPhieuXuatHangViewSet(viewsets.ModelViewSet):
    queryset = ChiTietPhieuXuatHang.objects.all()
    serializer_class = ChiTietPhieuXuatHangSerializer
    permission_classes = [IsAuthenticated]

class BaoCaoCongNoViewSet(viewsets.ModelViewSet):
    queryset = BaoCaoCongNo.objects.all()
    serializer_class = BaoCaoCongNoSerializer
    permission_classes = [IsAuthenticated]

class PhieuThuTienViewSet(viewsets.ModelViewSet):
    queryset = PhieuThuTien.objects.all()
    serializer_class = PhieuThuTienSerializer
    permission_classes = [IsAuthenticated]

class ThamSoViewSet(viewsets.ModelViewSet):
    queryset = ThamSo.objects.all()
    serializer_class = ThamSoSerializer
    permission_classes = [IsAuthenticated]

class NhaCungCapViewSet(viewsets.ModelViewSet):
    queryset = NhaCungCap.objects.all()
    serializer_class = NhaCungCapSerializer
    permission_classes = [IsAuthenticated]

class LoaiDaiLyViewSet(viewsets.ModelViewSet):
    queryset = LoaiDaiLy.objects.all()
    serializer_class = LoaiDaiLySerializer
    permission_classes = [IsAuthenticated]

class QuanViewSet(viewsets.ModelViewSet):
    queryset = Quan.objects.all()
    serializer_class = QuanSerializer
    permission_classes = [IsAuthenticated]
