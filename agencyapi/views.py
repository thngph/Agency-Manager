from django.http import HttpResponse
from django.shortcuts import redirect, render
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.views.generic import TemplateView
from rest_framework import viewsets
from .permissions import IsOwnerOrReadOnly
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from .forms import *
from django.utils.decorators import method_decorator

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import *
from .models import *

def index(request):
    if request.method == 'GET':
        # <view logic>
        return HttpResponse('Hi xin chao ca nha yeu')

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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



class UserRegisterView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('/')
        form = myUserCreationForm()
        return render (request=request, template_name="register.html", context={"register_form":form})
        # return render(request, 'register.html')
    def post(self, request):
        if request.data.get('password1') != request.data.get('password2'):
            return JsonResponse({
                'error_message': 'This user has already exist!',
                'errors_code': 400,
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(data={'username': request.data.get('username'), 'password': request.data.get('password1')})
        if serializer.is_valid():
            serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
            serializer.save()
            return redirect('/login')
            # return JsonResponse({
            #     'message': 'Register successful!'
            # }, status=status.HTTP_201_CREATED)

        else:
            return JsonResponse({
                'error_message': 'This user has already exist!',
                'errors_code': 400,
            }, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('/')
        form = myAuthenticationForm()
        return render(request, 'auth.html', {'login_form': form})
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                request,
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )

            if user:

                login(request, user)
                refresh = TokenObtainPairSerializer.get_token(user)
                data = {
                    'refresh_token': str(refresh),
                    'access_token': str(refresh.access_token)
                }
                return redirect('index')
                # return Response(data, status=status.HTTP_200_OK)

            return Response({
                'error_message': 'Email or password is incorrect!',
                'error_code': 400
            }, status=status.HTTP_400_BAD_REQUEST)

        return Response({
            'error_messages': serializer.errors,
            'error_code': 400
        }, status=status.HTTP_400_BAD_REQUEST)


def logout_request(request):
	logout(request)
	return redirect("login")