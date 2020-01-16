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
    quantity = serializers.SerializerMethodField()
    MAX_QUANTITY = 3

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
            'quantity',
        ]

    def get_quantity(self, obj):
        quantity = obj.quantity
        if quantity >= self.MAX_QUANTITY:
            quantity = self.MAX_QUANTITY
        return quantity
