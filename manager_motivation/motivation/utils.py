from .models import Employee, Deals
from django.db.models import Sum, F, Q
from datetime import datetime, timedelta, timezone

import calendar


def calculate_premium():
    try:
        employee = Employee.objects.get(pk=id)
    except Deals.DoesNotExist:
        return {"error": "Deal not found"}
    
    # Базовый МРОТ
    BASE_MROT = 15000
    # Получаем текущую дату
    today = timezone.now() 

    # Определяем начало и конец предыдущего месяца
    first_day_of_current_month = today.replace(day=1)
    last_day_of_last_month = first_day_of_current_month - timedelta(days=1)
    first_day_of_last_month = last_day_of_last_month.replace(day=1)
    current_month = datetime.now().month
    
    #сделки за месяц
    deals = Deals.objects.filter(
        employers_id=employee,
        #date__month=current_month,
        date__gte=first_day_of_last_month, deals__date__lte=last_day_of_last_month,
        status='Завершено'
    )

    for deal in deals:
        base_income += deal.sum * (deal.product_id.percent + deal.payment_type)
    
    if deals.filter(employers_id=employee).count() >= 2:
        base_income =  base_income * 0.5

    #Топ 5 сотрудников
    employee_top_5_in_fillial = Employee.objects.annotate(
        id_roles__fillial=F('id_roles__fillial'),
        total_sales=Sum('deals__sum', filter=Q(deals__date__gte=first_day_of_last_month, deals__date__lte=last_day_of_last_month))).order_by('-total_sales')[:5]
    """ employee_top_5_in_fillial = Employee.objects.annotate(
        id_roles__fillial=F('id_roles__fillial'),
        total_sales=Sum('deals__sum', filter=Q(deals__date__month=current_month))).order_by('-total_sales')[:5] """
    for index, employees in enumerate(employee_top_5_in_fillial, start=1):
        if employees.id == employee:
            # Проверка условий по каждому месту
            if index == 1:
                base_income += deal.sum * 0.15
            elif index == 2:
                base_income += deal.sum * 0.14
            elif index == 3:
                base_income += deal.sum * 0.13
            elif index == 4:
                base_income += deal.sum * 0.12
            elif index == 5:
                base_income += deal.sum * 0.11
    
    top_3_fillials = Employee.objects.annotate(
        total_sales=Sum('deals__sum', filter=Q(deals__date__gte=first_day_of_last_month, deals__date__lte=last_day_of_last_month))
    ).values('id_roles__fillial').annotate(
        total_income=Sum('total_sales')
    ).order_by('-total_income')[:3]
    """ top_3_fillials = Employee.objects.annotate(
        total_sales=Sum('deals__sum', filter=Q(deals__date__month=current_month))
    ).values('id_roles__fillial').annotate(
        total_income=Sum('total_sales')
    ).order_by('-total_income')[:3] """

    # Шаг 3: Для каждого филиала в топ-3 применяем условия по месту
    for index, fillial in enumerate(top_3_fillials):
        if employee in fillial:
            if index == 0:  # 1 место
                base_income += deal.sum * 0.07
            elif index == 1:  # 2 место
                base_income += deal.sum * 0.06
            elif index == 2:  # 3 место
                base_income += deal.sum * 0.05
    
    # Срок работы сотрудника
    hire_date = employee.user.date_joined
    years_worked = (datetime.now().date() - hire_date.date()).days // 365
    if years_worked == 1:
        base_income += base_income * 0.02
    elif years_worked == 2:
        base_income += base_income * 0.04
    elif years_worked >= 3:
        base_income += base_income * 0.06

    total_income = BASE_MROT + base_income

    # Возвращаем результат
    return {
        "employee": employee.fio,
        "total_income": total_income,
    }