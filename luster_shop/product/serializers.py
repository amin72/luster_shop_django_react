from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']



class ProductListSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = [
            'name',
            'slug',
            'image',
            'price',
            'category',
            'model',
            'code',
        ]



class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = [
            'name',
            'slug',
            'description',
            'image',
            'price',
            'category',
            'model',
            'code',
        ]
