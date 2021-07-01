from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('employee/', views.ListEmployeesView.as_view(), name="employees"),
    path('employee/create/', views.add_employees, name="add_employees"),
    path('employee/<str:pk>', views.get_employee, name="employee"),
]
