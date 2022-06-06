# from attr import field
from django import forms as f
from django.contrib.auth.forms import AuthenticationForm, UsernameField, UserCreationForm
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import password_validation
from django import forms
from django.db import models
from . import models

class myAuthenticationForm(AuthenticationForm):
    username = UsernameField(
        # required=False,
        label=_("Tên đăng nhập")
        ,widget=f.TextInput(attrs={"autofocus": True, "class":"username-input form-input "}))
    password = f.CharField(
        label=_("Mật khẩu"),
        strip=False,
        widget=f.PasswordInput(attrs={"autocomplete": "current-password", "class":"password-input form-input text-title"}),
    )

class myUserCreationForm(UserCreationForm):
    username = UsernameField(
        label=_("Tên đăng nhập")
        ,widget=f.TextInput(attrs={"autofocus": True, "class":"username-input form-input"}))
    password1 = f.CharField(
        label=_("Mật khẩu"),
        strip=False,
        widget=f.PasswordInput(attrs={"autocomplete": "new-password", "class":"password-input form-input text-title"}),
        #help_text=password_validation.password_validators_help_text_html(),
    )
    password2 = f.CharField(
        label=_("Nhập lại mật khẩu"),
        widget=f.PasswordInput(attrs={"autocomplete": "new-password", "class":"password-input form-input text-title"}),
        strip=False,
        #help_text=_("Enter the same password as before, for verification."),
    )


class TiepNhan(forms.ModelForm):
    class Meta:
        model = models.DaiLy
        fields = ['TenDaiLy', 'MaLoaiDaiLy','DienThoai','DiaChi', 'MaQuan','NgayTiepNhan', 'Email']
    


class ThuTienForm(forms.Form):
    TenDaiLy = forms.CharField(max_length=50, min_length=0)
    DiaChi = forms.CharField(max_length=50, min_length=0)
    DienThoai = forms.CharField(max_length=50, min_length=0)
    Email = forms.CharField(max_length=50, min_length=0)
    NgayThuTien = forms.DateField()
    SoTienThu = forms.IntegerField()
    


class PhieuThuTien(forms.ModelForm):
    class Meta:
        model= models.PhieuThuTien
        fields = ['MaDaiLy', 'NgayThuTien', 'SoTienThu']




class NhapHang(forms.ModelForm):
    class Meta:
        model = models.PhieuNhapHang
        fields = ['NgayNhap', 'MaNCC']
    
class XuatHang(forms.ModelForm):
    class Meta:
        model = models.PhieuXuatHang
        fields = ['NgayXuat', 'MaDaiLy']