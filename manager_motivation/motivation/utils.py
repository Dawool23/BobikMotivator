from .models import Roles, Employee, Clients, Product, Deals


def calculate_premium():
    # Получение всех завершенных сделок
    completed_deals = Deals.objects.filter(status='Завершено')

    for deal in completed_deals:
        # Получение сотрудника, связанного с продажей
        employee = deal.employers_id
        
        # Расчет премии (например, 10% от суммы сделки)
        premium = deal.sum.amount * 0.10  # Если используется MoneyField
        
        # Логика записи премии (например, отправить уведомление)
        print(f"Сотрудник: {employee.fio}, Премия: {premium} RUB")
