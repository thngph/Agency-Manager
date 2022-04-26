from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

class ThamSoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThamSo
        fields = '__all__'

class BaoCaoDoanhSoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaoCaoDoanhSo
        fields = '__all__'

class ChiTietBaoCaoDoanhSoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChiTietBaoCaoDoanhSo
        fields = '__all__'

class BaoCaoCongNoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaoCaoCongNo
        fields = '__all__'

class PhieuThuTienSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhieuThuTien
        fields = '__all__'

class DVTSerializer(serializers.ModelSerializer):
    class Meta:
        model = DVT
        fields = '__all__'

class NhaCungCapSerializer(serializers.ModelSerializer):
    class Meta:
        model = NhaCungCap
        fields = '__all__'

class PhieuNhapHangSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhieuNhapHang
        fields = '__all__'

class ChiTietPhieuNhapHangSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChiTietPhieuNhapHang
        fields = '__all__'

class MatHangSerializer(serializers.ModelSerializer):
    class Meta:
        model = MatHang
        fields = '__all__'

class PhieuXuatHangSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhieuXuatHang
        fields = '__all__'

class ChiTietPhieuXuatHangSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChiTietPhieuXuatHang
        fields = '__all__'

class LoaiDaiLySerializer(serializers.ModelSerializer):
    class Meta:
        model = LoaiDaiLy
        fields = '__all__'

class QuanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quan
        fields = '__all__'

class DaiLySerializer(serializers.ModelSerializer):
    class Meta:
        model = DaiLy
        fields = '__all__'

