from rest_framework import serializers
from .models import Category, FilterCheck, OptionCheck,  FilterColor, FilterPrice

__author__ = 'lucaru9'


class OptionCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = OptionCheck
        fields = ('id', 'name')


class FilterCheckSerializer(serializers.ModelSerializer):
    optionscheck = OptionCheckSerializer(many=True)

    class Meta:
        model = FilterCheck
        fields = ('id', 'name', 'optionscheck')





class FilterColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilterColor
        fields = ('id', 'name')


class FilterPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilterPrice
        fields = ('id', 'min_price', 'max_price')


class CategorySerializer(serializers.ModelSerializer):
    filterchecks = FilterCheckSerializer(many=True)
    filtercolors = FilterColorSerializer(many=True)
    filterprices = FilterPriceSerializer(many=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'filterchecks', 'filtercolors', 'filterprices')
