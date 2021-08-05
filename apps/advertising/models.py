from django.db import models

# Create your models here.

class Advertisement(models.Model):
  company_name = models.CharField(max_length=150, default="Industry Dive") 
  copy = models.TextField(max_length=1000, default="Want to read more great stories? Sign up for a newsletter!")
  logo = models.CharField(max_length=150, default="industry-dive.png") # can set up folder to upload files and use FileField?
  url = models.CharField(max_length=150, default="https://industrydive.com")


  def __str__(self):
    return self.company_name + " - " + self.copy[:100]

