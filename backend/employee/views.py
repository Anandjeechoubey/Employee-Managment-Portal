from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse
from .models import Employee
from django.core import serializers
# Create your views here.

def get_employee(request):
    if request.method == 'GET':
        employee = Employee.objects.all()
        return JsonResponse(serializers.serialize('json', employee), safe=False)
    if request.method == 'POST':
        name = request.POST.get('name')
        gender = request.POST.get('gender')
        salary = request.POST.get('salary')
        address = request.POST.get('address')
        team = request.POST.get('team')
        print(name, gender, salary, address, team)
        #Employee.objects.create(name=name, gender=gender, salary=salary, address=address, team=team)
        return JsonResponse({'msg':'success'})