from django.contrib import admin

# Register your models here.
from ..sales.models import Sale, SaleProduct


class SaleAdmin(admin.ModelAdmin):
    model = Sale
    list_display = ('uid', 'user', 'state')
    readonly_fields = ('date_requested',)


admin.site.register(Sale, SaleAdmin)
admin.site.register(SaleProduct)
