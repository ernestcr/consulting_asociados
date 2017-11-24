from django.contrib import admin
from .models import Product, Image, Characteristic, Specification, SizeProduct


class ImageInline(admin.TabularInline):
    model = Image
    extra = 0
    verbose_name = 'Imagen'
    verbose_name_plural = 'Imagenes'


class ProductAdmin(admin.ModelAdmin):
    model = Product
    readonly_fields = ('slug', 'net_price')
    fields = ('created_at', 'name', 'slug', 'image_principal', 'model', 'description', 'unit_price', 'gross_price',
              'discount', 'net_price', 'is_enabled', 'subcategory', 'stores', 'size')
    inlines = (ImageInline,)
    readonly_fields = ('created_at',)


admin.site.register(Product, ProductAdmin)
admin.site.register(Image)
admin.site.register(Characteristic)
admin.site.register(Specification)
admin.site.register(SizeProduct)
