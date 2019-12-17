from django.db.models import Q, CharField
from django.db.models.functions import Lower
from rest_framework import generics, permissions
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from .pagination import ProductPageNumberPagination


# register lower as CharField functionality
CharField.register_lookup(Lower, "lower")



class ProductListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(publish=True)
    pagination_class = ProductPageNumberPagination



class ProductDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(publish=True)
    lookup_field = 'slug'



class ProductListByCategoryAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductSerializer
    pagination_class = ProductPageNumberPagination

    def get_queryset(self):
        category_name = self.kwargs.get('category_name', None)
        qs = Product.objects.filter(Q(category__name__lower=category_name))
        return qs



class CategoryListAPIView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
