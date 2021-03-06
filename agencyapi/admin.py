from django.contrib import admin
from .models import *

class AdminSiteDaiLy(admin.ModelAdmin):
    readonly_fields = ('MaDaiLy',)

class AdminSiteNCC(admin.ModelAdmin):
    readonly_fields = ('MaNCC',)
# Register your models here.
admin.site.register(ThamSo)
admin.site.register(BaoCaoDoanhSo)
admin.site.register(ChiTietBaoCaoDoanhSo)
admin.site.register(BaoCaoCongNo)
admin.site.register(PhieuThuTien)
admin.site.register(DVT)
admin.site.register(NhaCungCap, AdminSiteNCC)
admin.site.register(PhieuNhapHang)
admin.site.register(ChiTietPhieuNhapHang)
admin.site.register(MatHang)
admin.site.register(PhieuXuatHang)
admin.site.register(ChiTietPhieuXuatHang)
admin.site.register(LoaiDaiLy)
admin.site.register(Quan)
admin.site.register(DaiLy, AdminSiteDaiLy)

