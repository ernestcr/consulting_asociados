from django import forms

__author__ = 'lucaru9'


class UpdateSalesForm(forms.Form):
    code = forms.CharField(widget=forms.TextInput(attrs={'class':'form-control'}))
    voucher = forms.FileField(widget=forms.FileInput(attrs={'class':'form-control'}))
