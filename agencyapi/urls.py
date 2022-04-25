from django.urls import include, path
from rest_framework import routers
from . import views
from .views import *

router = routers.DefaultRouter()
router.register(r'DVT', DVTViewSet)
router.register(r'LoaiDaiLy', LoaiDaiLyViewSet)
router.register(r'Quan', QuanViewSet)
router.register(r'DaiLy', DaiLyViewSet)
router.register(r'MatHang', MatHangViewSet)
router.register(r'PhieuNhapHang', PhieuNhapHangViewSet)
router.register(r'ChiTietPhieuNhapHang', ChiTietPhieuNhapHangViewSet)
router.register(r'PhieuXuatHang', PhieuXuatHangViewSet)
router.register(r'ChiTietPhieuXuatHang', ChiTietPhieuXuatHangViewSet)
router.register(r'BaoCaoDoanhSo', BaoCaoDoanhSoViewSet)
router.register(r'ChiTietBaoCaoDoanhSo', ChiTietBaoCaoDoanhSoViewSet)
router.register(r'BaoCaoCongNo', BaoCaoCongNoViewSet)
router.register(r'PhieuThuTien', PhieuThuTienViewSet)
router.register(r'ThamSo', ThamSoViewSet)
router.register(r'NhaCungCap', NhaCungCapViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls',namespace='rest_framework'))
]