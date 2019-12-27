from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),

    # product urls
    path('api/products/', include('product.urls')),

    # frontend urls
    path('', include('frontend.urls')),
    
    # account urls
    path('api/auth/', include('account.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
