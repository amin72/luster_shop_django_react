from django.contrib import admin
from django.db import models
from django.forms import TextInput
from .models import Category, Product


# Category
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'position']
    search_fields = ['name']
    list_editable = ['position']


# Product
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.CharField: {'widget': TextInput(attrs={'size':100})},
    }

    fields = ['name', 'slug', 'description', 'image', 'price', 'quantity',
        'category', 'model', 'code', 'publish']
    list_display = ['name', 'slug', 'price', 'quantity',
        'category', 'model', 'code', 'publish']
    list_filter = ['category', 'publish']
    search_fields = ['name', 'description']
    raw_id_fields = ['category']
    prepopulated_fields = {'slug': ['name']}