from django.db.models import query
from django.http.response import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse
from .models import Employee
from .serializers import EmployeeSerializer
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from rest_framework import generics
# Create your views here.

@ensure_csrf_cookie
def get_employee(request, pk):
    if request.method == 'GET':
        employee = EmployeeSerializer(Employee.objects.get(id=pk), many=False).data
        return JsonResponse(employee, safe=False)

    if request.method == 'PUT':
        obj = json.loads(request.body)
        emp = Employee.objects.get(id=pk)
        emp.name=obj['name']
        emp.gender=obj['gender']
        emp.salary=obj['salary']
        emp.address=obj['address']
        emp.team=obj['team']
        emp.save()
        return JsonResponse({'msg':'success'})

    if request.method == 'DELETE':
        emp = Employee.objects.get(id=pk)
        emp.delete()
        return JsonResponse({'msg':'success'})

@ensure_csrf_cookie
def get_employees(request):
    if request.method == 'GET':
        employee = EmployeeSerializer(Employee.objects.all(), many=True).data
        return JsonResponse(employee, safe=False)

class ListEmployeesView(generics.ListAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

    def get_queryset(self):
        query_params = self.request.query_params
        q = query_params.get('q','')
        queryset = Employee.objects.filter(name__icontains=q)
        return queryset

@ensure_csrf_cookie
def add_employees(request):
    if request.method == 'POST':
        obj = json.loads(request.body)
        Employee.objects.create(name=obj['name'], gender=obj['gender'], salary=obj['salary'], address=obj['address'], team=obj['team'])
        return JsonResponse({'msg':'success'})