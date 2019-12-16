from django.urls import path
from . import apis


app_name = 'product'

urlpatterns = [
    # product list by category
    path('categories/', apis.CategoryListAPIView.as_view(),
        name='category_list'),

    # product list
    path('', apis.ProductListAPIView.as_view(), name='list'),

    # product list by category
    path('<str:category_name>/', apis.ProductListByCategoryAPIView.as_view(),
        name='list_by_category'),

    # product detail
    path('<str:slug>/', apis.ProductDetailAPIView.as_view(), name='detail'),
]
