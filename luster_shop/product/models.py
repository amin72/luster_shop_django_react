from django.db import models
from django.utils.translation import ugettext_lazy as _


class Category(models.Model):
    name = models.CharField(max_length=120, unique=True)
    position = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['position']
        verbose_name_plural = _('Categories')

    def __str__(self):
        return self.name

    

class Product(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(default='')
    image = models.ImageField(upload_to='product_images',
        default='product_images/default.jpg')
    price = models.FloatField(default=0)
    quantity = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL,
        null=True)
    model = models.CharField(max_length=40, blank=True)
    code = models.CharField(max_length=40, blank=True)
    publish = models.BooleanField(default=True)

    class Meta:
        ordering = ['-id']
    
    def __str__(self):
        return self.name
