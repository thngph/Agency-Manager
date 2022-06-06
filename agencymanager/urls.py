"""agencymanager URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('agencyapi.urls')),
    path('', index, name='index'),
    path('tiepnhan/', tiepnhan, name='tiepnhan'),
    path('nhaphang/', nhaphang, name='nhaphang'),
    path('xuathang/', xuathang, name='xuathang'),
    path('chitietnhaphang/', chitietnhaphang, name='chitietnhaphang'),
    path('chitietxuathang/<MaDaiLy>/<NgayXuat>/<id>/', chitietxuathang, name='chitietxuathang'),
    path('delete/chitietxuathang/<MaDaiLy>/<NgayXuat>/<id>/', delete_chitietxuathang, name='delete_chitietxuathang'),
    path('thutien/', thutien, name='thutien'),
    path('tracuu/', tracuu, name='tracuu'),
    path('doanhso/', doanhso, name='doanhso'),
    path('congno/', congno, name='congno'),
    path('quydinh/', quydinh, name='quydinh'),
    path('profile/', profile, name='profile'),
    path('logout/', logout, name='logout'),
]
