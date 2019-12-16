from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),

    # product urls
    path('products/', include('product.urls')),
]
