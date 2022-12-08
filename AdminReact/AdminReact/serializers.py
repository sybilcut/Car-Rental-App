from .models import *
from rest_framework import serializers
# Create your serializers here.

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = ('ID','Manufacturer','Model','FuelType','Colour','LicencePlate','Status','Mileage','CarTypeID')

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('BranchID',
                'PhoneNumber',
                'Province',
                'City',
                'PostalCode',
                'StreetNumber',
                'StreetName',
                'UnitNumber')

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('ID',
                'FirstName', 
                'LastName', 
                'DriversLicense', 
                'Email', 
                'Customer_Phone', 
                'DOB', 
                'GoldMember', 
                'Province', 
                'City', 
                'PostalCode', 
                'StreetNumber', 
                'StreetName', 
                'UnitNumber') 

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('ID',
                'FirstName',
                'LastName',
                'Email',    
                'Employee_Phone',
                'Password',
                'Salt',
                'Salary',
                'Rank',
                'DOB',
                'Province',
                'City',
                'PostalCode',
                'StreetNumber',
                'StreetName',
                'UnitNumber')

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = ('RentalID',
                'DateFrom',
                'DateTo',
                'DateReturned',
                'TotalCost',
                'LicensePlate',
                'GoldMember',
                'CustomerID',
                'PickupBranchID',
                'DropoffBranchID',
                'PaidOff')

class CarTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarType
        fields = ('TypeID',
                'Description',
                'DailyCost',
                'WeeklyCost',
                'MonthlyCost',
                'LateFee',
                'ChangeBranchFee')