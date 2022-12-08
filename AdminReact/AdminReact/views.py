from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers as s
from rest_framework.views import APIView
from rest_framework import generics, viewsets
from rest_framework.response import Response
from .serializers import *
from .models import *
import json
import datetime
# Create your views here.


#####################
## FUNCTIONS
#####################    

#moves a car from its location to the desired place
#a cars status is A) its positive integer branchID or B) -1 rented
def moveCar(carID,dest):
    myCar = Car.objects.get(ID=carID)
    myCar.Status = dest
    myCar.save()
    return 

def calcCost(basis, increments):
    total = basis*increments
    return total

def updateRental(rentalobj, paidfor, retdate, dest):
    temp = rentalobj.TotalCost
    cust = Customer.objects.get(ID=rentalobj.CustomerID)
    car = Car.objects.get(LicensePlate=rentalobj.LicensePlate)
    cartype = CarType.objects.get(TypeID = car.CarTypeID)
    changefee = cartype.ChangeBranchFee

    temp += calcLateFee(rentalobj.DateTo, rentalobj.DateReturned)
    
    if (dest.BranchID != rentalobj.PickupID and cust.GoldMember==False):
        temp += changefee

    rentalobj.TotalCost=temp
    rentalobj.PaidOff = paidfor
    rentalobj.DateReturned = retdate
    rentalobj.save()

def newRental (dateto, datefrom, car, cust, branch, basis, basiscost):

    increments = (retdate-datetime.date.today())//basis #in days
    cost = calcCost(basiscost, increments)


    new = Rental(DateFrom = datefrom, 
                    DateTo = dateto,
                    TotalCost = cost,
                    LicensePlate = car.LicensePlate,
                    GoldMember = cust.GoldMember,
                    CustomerID = cust.ID,
                    PickupBranchID = branch.ID,
                    PaidOff = False)

    new.save()

def calcLateFee(realdate, expecteddate,latefee):

    fee = realdate-expecteddate*(latefee if realdate-expecteddate<15 else latefee*1.2)

    return (fee if fee>0 else 0) 

def autoGrantGold(cust):
    #if customer rented >=3 times with a total>2000
    #grant gold
    custrentals = Rental.objects.filter(CustomerID=cust.ID, PaidOff=True)
    total=0
    for rent in custrentals:
        total += rent.TotalCost

    if len(rent)>=3 and total>3000:
        cust.GoldMember = True
    cust.save()
    return

def isCustomerBanned(cust):
    custrentals = Rental.objects.filter(CustomerID=cust.ID, PaidOff=False)
    for rent in custrentals:
        if rent.DateReturned-rent.DateTo > 15:
            return True
    return False

def getCustomerFromDL(licensenum):
    cust = Customer.objects.get(DriversLicense=licensenum)
    return cust



###############
## VIEWS
###############

class CarView(viewsets.ModelViewSet):       

    serializer_class = CarSerializer
    queryset = Car.objects.all()

class BranchView(viewsets.ModelViewSet):

    serializer_class = BranchSerializer
    queryset = Branch.objects.all()

class CarTypeView(viewsets.ModelViewSet):

    serializer_class = CarTypeSerializer
    queryset = CarType.objects.all()

class CustomerView(viewsets.ModelViewSet):

    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()

##COMPLETE
## For ease of implementation I decided to get arguments from url params and overload get for simple fetch formatting
class RentalsByBranch(APIView):
    def get(self, request, *args, **kwargs):
        branch = request.GET.get("branch")
        print(f"Returning rentals by branch {branch}")
        get = Rental.objects.filter(PickupBranchID=branch.BranchID)
        res = s.serialize('json', get)
        return JsonResponse(res, safe=False)



##COMPLETE
class ReturnCarFromRental(APIView):
    def get(self, request, *args, **kwargs):
        dest = request.GET.get("branch")

        carID = request.GET.get("car")
        car = Car.objects.filter(ID=carID)

        paid = request.GET.get("paid")
        
        rental = Rental.objects.get(LicensePlate = car.LicensePlate, DateReturned__isnull = True)
        moveCar(car.ID, dest)
        updateRental(rental, bool(paid), datetime.date.today(), dest)
        return HttpResponse('car returned to branch')

##COMPLETE
#Honestly should be implemented with a form
class RentCar(APIView):
    def get(self, request, *args, **kwargs):

        pickupID = request.GET.get("branch")
        branch = Branch.objects.get(BranchID=pickupID)

        carID = request.GET.get("car")
        car = Car.objects.get(ID=carID)
        cartype = CarType.objects.get(TypeID=car.CarTypeID)

        licensenum = request.GET.get("license")
        cust = getCustomerFromDL(licensenum)

        dateto = request.GET.get("dateto")
        datefrom = request.GET.get("datefrom")
        
        basis = request.GET.get("basis")
        if (basis == "weekly"):
            costper = cartype.WeeklyCost
        elif (basis=="monthly"):
            costper = cartype.MonthlyCost
        else:
            costper = cartype.DailyCost
        if not isCustomerBanned(cust):

            newRental(dateto, datefrom, car, cust, branch, basis, costper)
            moveCar(carID, -1)
            return HttpResponse('car rented')
        
        return HttpResponse('did not rent - banned')


## COMPLETE
class TransferCar(APIView):
    queryset = Car.objects.all()
    def post(self, request, *args, **kwargs):
        content = json.loads(request.body)
        print(f"Moving car {content['carID']} to branch {content['branchID']}", request.data)
        moveCar(content['carID'], content['branchID'])
        return HttpResponse('car returned to branch')

## COMPLETE
class CarByStatusView(APIView):

    def get(self, request, *args, **kwargs):
        branch = request.GET.get("branch")
        print("Returning cars by branch/status", branch)
        get = Car.objects.filter(Status=branch)
        res = s.serialize('json', get)
        return JsonResponse(res, safe=False)


