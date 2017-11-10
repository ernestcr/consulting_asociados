from django.contrib import admin

# Register your models here.
from .models import Country, City, Store, Banner

admin.site.register(Country)
admin.site.register(City)
admin.site.register(Store)
admin.site.register(Banner)
