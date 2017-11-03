from django.db import models
from django.utils import timezone

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(verbose_name='Producto', max_length=100, null=False, blank=False)
    marca = models.CharField(verbose_name='Marca', max_length=100, null=True, blank=True)
    descripcion = models.CharField(verbose_name='Descripción', max_length=500, blank=True, null=True)
    stock = models.PositiveIntegerField(verbose_name='Stock', null=False,blank=False)
    fecha_registro = models.DateTimeField(verbose_name='Fecha Registro', default=timezone.now)
    usuario_registro = models.ForeignKey('auth.User')