from django.db import models

# Create your models here.
class ThamSo(models.Model):
    MaThamSo = models.AutoField(primary_key=True)
    TenThamSo = models.CharField(max_length=50)
    GiaTri = models.CharField(max_length=50)
    
    def __str__(self):
        return self.TenThamSo

class BaoCaoDoanhSo(models.Model):
    MaBaoCaoDoanhSo = models.AutoField(primary_key=True)
    Thang = models.IntegerField()
    Nam = models.IntegerField()
    TongDoanhSo = models.IntegerField()
    
    def __str__(self):
        return self.MaBaoCaoDoanhSo

class ChiTietBaoCaoDoanhSo(models.Model):
    MaChiTietBaoCaoDoanhSo = models.AutoField(primary_key=True)
    MaBaoCaoDoanhSo = models.ForeignKey(BaoCaoDoanhSo, on_delete=models.CASCADE)
    MaDaiLy = models.ForeignKey('DaiLy', on_delete=models.CASCADE)
    SoPhieuXuat = models.IntegerField()
    TongGiaTri = models.IntegerField()
    TiLe = models.FloatField()
    
    def __str__(self):
        return self.MaChiTietBaoCaoDoanhSo

class BaoCaoCongNo(models.Model):
    MaBaoCaoCongNo = models.AutoField(primary_key=True)
    Thang = models.IntegerField()
    Nam = models.IntegerField()
    MaDaiLy = models.ForeignKey('DaiLy', on_delete=models.CASCADE)
    NoDau = models.IntegerField()
    NoCuoi = models.IntegerField()
    PhatSinh = models.IntegerField()
    TongCongNo = models.IntegerField()
    
    def __str__(self):
        return self.MaBaoCaoCongNo

class PhieuThuTien(models.Model):
    MaPhieuThuTien = models.AutoField(primary_key=True)
    MaDaiLy = models.ForeignKey('DaiLy', on_delete=models.CASCADE)
    NgayThuTien = models.DateField()
    SoTienThu = models.IntegerField()
    
    def __str__(self):
        return self.MaPhieuThuTien

class DVT(models.Model):
    MaDVT = models.AutoField(primary_key=True)
    TenDVT = models.CharField(max_length=100)
    
    def __str__(self):
        return self.TenDVT

class NhaCungCap(models.Model):
    MaNCC = models.AutoField(primary_key=True)
    TenNCC = models.CharField(max_length=100)

    def __str__(self):
        return self.TenNCC

class PhieuNhapHang(models.Model):
    MaPhieuNhapHang = models.AutoField(primary_key=True)
    NgayNhap = models.DateField()
    TongTien = models.IntegerField()
    MaNCC = models.ForeignKey(NhaCungCap, on_delete=models.CASCADE)

    def __str__(self):
        return self.MaPhieuNhapHang

class ChiTietPhieuNhapHang(models.Model):
    MaChiTietPhieuNhapHang = models.AutoField(primary_key=True)
    MaPhieuNhapHang = models.ForeignKey(PhieuNhapHang, on_delete=models.CASCADE)
    MaMatHang = models.ForeignKey('MatHang', on_delete=models.CASCADE)
    SoLuong = models.IntegerField()
    DonGia = models.IntegerField()
    ThanhTien = models.IntegerField()

    def __str__(self):
        return self.MaChiTietPhieuNhapHang

class MatHang(models.Model):
    MaMatHang = models.AutoField(primary_key=True)
    TenMatHang = models.CharField(max_length=100)
    DVT = models.ForeignKey(DVT, on_delete=models.CASCADE)
    SoLuongTon = models.IntegerField()

    def __str__(self):
        return self.TenMatHang

class PhieuXuatHang(models.Model):
    MaPhieuXuatHang = models.AutoField(primary_key=True)
    NgayXuat = models.DateField()
    MaDaiLy = models.ForeignKey('DaiLy', on_delete=models.CASCADE)
    TongTien = models.IntegerField()

    def __str__(self):
        return self.MaPhieuXuatHang

class ChiTietPhieuXuatHang(models.Model):
    MaChiTietPhieuXuatHang = models.AutoField(primary_key=True)
    MaPhieuXuatHang = models.ForeignKey(PhieuXuatHang, on_delete=models.CASCADE)
    MaMatHang = models.ForeignKey('MatHang', on_delete=models.CASCADE)
    SoLuong = models.IntegerField()
    DonGia = models.IntegerField()
    ThanhTien = models.IntegerField()

    def __str__(self):
        return self.MaChiTietPhieuXuatHang

class LoaiDaiLy(models.Model):
    MaLoaiDaiLy = models.AutoField(primary_key=True)
    TenLoaiDaiLy = models.CharField(max_length=50)
    SoNoToiDa = models.IntegerField()

    def __str__(self):
        return self.TenLoaiDaiLy

class Quan(models.Model):
    MaQuan = models.AutoField(primary_key=True)
    TenQuan = models.CharField(max_length=50)

    def __str__(self):
        return self.TenQuan

class DaiLy(models.Model):
    MaDaiLy = models.AutoField(primary_key=True)
    TenDaiLy = models.CharField(max_length=50)
    MaLoaiDaiLy = models.ForeignKey('LoaiDaiLy', on_delete=models.CASCADE)
    DiaChi = models.CharField(max_length=50)
    MaQuan = models.ForeignKey('Quan', on_delete=models.CASCADE)
    DienThoai = models.CharField(max_length=50)
    Email = models.CharField(max_length=50)
    SoTienNo = models.IntegerField()
    def __str__(self):
        return self.TenDaiLy