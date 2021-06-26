from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('employee/', views.get_employee, name="employee"),
]
