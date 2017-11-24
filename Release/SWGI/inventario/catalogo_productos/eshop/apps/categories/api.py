import logging

from .models import FilterCheck
from .models import Category

from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import parser_classes
from rest_framework.parsers import FileUploadParser, MultiPartParser

logger = logging.getLogger(__name__)

@api_view(['GET'])
def filters_api(request, pk):
    logger.info("<-- ingreso -->")
    arr_list = []

    category = Category.objects.get(pk=pk)
    filters_checks = category.filterchecks.all()
    for filter in filters_checks:
        options = filter.optionscheck.all()
        options_list = []
        for option in options:
            options_list.append({
                'name':option.name,
            })

        arr_list.append({
            'name':filter.name,
            'type': 'filterchecks',
            'options': options_list
        })

    
    filters_colors = category.filtercolors.all()
    logger.info(" filter colors ")
    logger.info(filters_colors)
    options_list = []
    for filter in filters_colors:
        
        options_list.append({
            'name':filter.name,
            'code':filter.code,
        })

    arr_list.append({
        'type': 'filtercolors',
        'options': options_list
    })
    

    return Response(arr_list)
