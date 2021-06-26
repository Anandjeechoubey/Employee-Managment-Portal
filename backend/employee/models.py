from django.db import models

# Create your models here.

class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=40)
    gender = models.CharField(max_length=6, choices= [("male","male"),("female","female"),], default="male")
    salary = models.IntegerField()
    team = models.CharField(max_length=10, null=True, blank=True)
    address = models.CharField(max_length=20)
