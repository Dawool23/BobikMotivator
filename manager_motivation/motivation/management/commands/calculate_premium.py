from django.core.management.base import BaseCommand
from motivation.models import Employee, Deals
from django.db.models import Sum, F, Q
from datetime import timedelta
from django.utils import timezone
from decimal import Decimal

import calendar


# Базовый МРОТ
BASE_MROT = 15000

class Command(BaseCommand):
    help = 'Calculate premium for employees based on sales'

    """ def add_arguments(self, parser):
        # Добавляем аргумент для employee_id
        parser.add_argument('employee_id', type=int, help='ID of the employee')
 """
    def handle(self, *args, **options):
        try:
            employee_id = 10
            employee = Employee.objects.get(pk=employee_id)
        except Deals.DoesNotExist:
            return {"error": "Deal not found"}

        today = timezone.now()
        print(f"today: {today}")

        first_day_of_current_month = today.replace(day=1)
        last_day_of_last_month = first_day_of_current_month - timedelta(days=1) + timedelta(hours=11, minutes=0)
        first_day_of_last_month = last_day_of_last_month.replace(month=11, day=1,)
        print(f"first_day_of_current_month: {first_day_of_current_month}"+
        f"last_day_of_last_month: {last_day_of_last_month}"+
        f"first_day_of_last_month: {first_day_of_last_month}"
              )

        # Сделки за месяц
        deals = Deals.objects.filter(
            employers_id=employee,
            date__gte=first_day_of_last_month,
            date__lte=last_day_of_last_month,
            status='Завершено'
        )
        print(f"Сделки за месяц: {deals}")

        base_income = Decimal(0)
        base_incomeX = Decimal(0)

        

        for deal in deals:
            if deal.payment_type == 'Наличные':
                base_income += deal.sum * (Decimal(deal.product_id.percent) + Decimal('0.005'))
                print(f"Наличные: {base_income}")
            elif deal.payment_type == 'Банковская карта':
                base_income += deal.sum * (Decimal(deal.product_id.percent) + Decimal('0'))
                print(f"Банковская карта: {base_income}")
            elif deal.payment_type == 'Кредит':
                base_income += deal.sum * (Decimal(deal.product_id.percent) + Decimal('0.008'))
                print(f"Кредит: {base_income}")

        
        if deals.filter(employers_id=employee).count() >= 2:
            base_incomeX = base_income * 0.5 + base_income
        else:
            base_incomeX = Decimal(0)


        employee_top_5_in_fillial = Employee.objects.annotate(
                total_sales=Sum('deals__sum', filter=Q(deals__date__gte=first_day_of_last_month, deals__date__lte=last_day_of_last_month))
        ).order_by('total_sales')[:5]

        print(f"Топ 5 в филиале: {employee_top_5_in_fillial}")


        for index, employees in enumerate(employee_top_5_in_fillial, start=1):
            if employees == employee:
                if index == 1:
                    base_income += base_income * Decimal(0.15)
                    print(f"1 место: {base_income}")
                elif index == 2:
                    base_income += base_income * Decimal(0.14)
                    print(f"2 место: {base_income}")
                elif index == 3:
                    base_income += base_income * Decimal(0.13)
                    print(f"3 место: {base_income}")
                elif index == 4:
                    base_income += base_income * Decimal(0.12)
                    print(f"4 место: {base_income}")
                elif index == 5:
                    base_income += base_income * Decimal(0.11)
                    print(f"5 место: {base_income}")
                else:
                    print(f"Нихуя не занял")
            print(f"Вообще нихуя")

        base_income += base_incomeX

        # Запрос для суммирования продаж по каждому филиалу
        top_3_fillials = Employee.objects.annotate(
            total_sales=Sum(
                'deals__sum', 
                filter=Q(deals__date__gte=first_day_of_last_month, deals__date__lte=last_day_of_last_month)
            )
        ).values('id_roles__fillial')  # Группируем по филиалу
        
        # Сортируем по сумме продаж и выбираем топ-3 филиала
        top_3_fillials = top_3_fillials.order_by('-total_sales')[:3]

        print(f"Филиал: {top_3_fillials}")


        
        """ for index, fillial in enumerate(top_3_fillials):
            if employee in fillial:
                if index == 0:  # 1 место
                    base_income += base_income * Decimal(0.07)
                    print(f"1 место: {base_income}")
                elif index == 1:  # 2 место
                    base_income += base_income * Decimal(0.06)
                    print(f"2 место: {base_income}")
                elif index == 2:  # 3 место
                    base_income += base_income * Decimal(0.05)
                    print(f"3 место: {base_income}")
            print(f"Нихуя не занял")
        print(f"Вообще нихуя") """

        hire_date = employee.user.date_joined
        years_worked = (timezone.now().date() - hire_date.date()).days // 365
        if years_worked == 1:
            base_income += base_income * Decimal(0.02)
        elif years_worked == 2:
            base_income += base_income * Decimal(0.04)
        elif years_worked >= 3:
            base_income += base_income * Decimal(0.06)

        total_income = BASE_MROT + base_income

        # Вывод результата в консоль
        self.stdout.write(f"Employee: {employee.fio}")
        self.stdout.write(f"Total Income: {total_income}")





""" base_income = 0
for deal in deals:
    if deal.payment_type == 'Наличные':
        base_income += deal.sum * (deal.product_id.percent + 0.05)
    elif deal.payment_type == 'Банковская карта':
        base_income += deal.sum * (deal.product_id.percent + 0)
    elif deal.payment_type == 'Кредит':
        base_income += deal.sum * (deal.product_id.percent + 0.08) """