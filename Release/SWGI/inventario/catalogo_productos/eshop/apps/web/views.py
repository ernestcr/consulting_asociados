from django.views.generic import TemplateView

from ..categories.models import Category
from ..products.models import Product
from ..stores.models import Banner

__author__ = 'lucaru9'


class HomeView(TemplateView):
    template_name = 'pages/home.html'

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['oferts'] = Product.objects.filter(discount__gt=0).order_by('-created_at')[0:8]
        context['news'] = Product.objects.all().order_by('-created_at')[0:12]
        context['categories'] = Category.objects.filter(is_subcategory=False, is_enabled=True)
        context['sliders'] = Banner.objects.filter(is_enabled=True)
        return context


# class ProducInHome(DetailView):
#     template_name = 'pages/product_in_home.html'
#     context_object_name = "product"
#     model = Product
