""" from django.test import TestCase
from .models import Employee, Deals, Clients, Roles
from datetime import datetime, timedelta
from django.contrib.auth.models import User
from .utils import calculate_premium


class CalculatePremiumTest(TestCase):

    def setUp(self):
        # Шаг 1: Создаем тестовые данные

        # Создаем роль для сотрудников, если она не существует
        self.role, created = Roles.objects.get_or_create(name='Менеджер', fillial=1)

        # Создаем пользователей в таблице auth_user
        self.user1 = User.objects.create_user(username="user1", password="password")
        self.user2 = User.objects.create_user(username="user2", password="password")
        self.user3 = User.objects.create_user(username="user3", password="password")

        # Создаем клиентов
        self.client1 = Clients.objects.create(name="Client 1")
        self.client2 = Clients.objects.create(name="Client 2")
        self.client3 = Clients.objects.create(name="Client 3")

        # Создаем сотрудников и связываем их с пользователями и ролью
        self.employee1 = Employee.objects.create(fio="Левина Яна Егоровна", user=self.user1, id_roles=self.role)
        self.employee2 = Employee.objects.create(fio="Исаев Андрей Миронович", user=self.user2, id_roles=self.role)
        self.employee3 = Employee.objects.create(fio="Костина Алиса Романовна", user=self.user3, id_roles=self.role)

        # Создаем сделки для сотрудников с реальными клиентами
        self.deal1 = Deals.objects.create(
            employers_id=self.employee1,
            client=self.client1,  # Передаем объект клиента
            sum=4000000,
            product_id=2,
            payment_type='Наличные',
            date=datetime.now() - timedelta(days=10),  # Сделка сделана в прошлом месяце
            status="Завершено"
        )
        self.deal2 = Deals.objects.create(
            employers_id=self.employee2,
            client=self.client2,  # Передаем объект клиента
            sum=8000000,
            product_id=3,
            payment_type='Банковская карта',
            date=datetime.now() - timedelta(days=5),  # Сделка сделана в прошлом месяце
            status="Завершено"
        )
        self.deal3 = Deals.objects.create(
            employers_id=self.employee3,
            client=self.client3,  # Передаем объект клиента
            sum=17500000,
            product_id=7,
            payment_type='Кредит',
            date=datetime.now() - timedelta(days=3),  # Сделка сделана в прошлом месяце
            status="Завершено"
        )

    def test_calculate_premium(self):
        # Базовый МРОТ
        BASE_MROT = 15000

        # Шаг 2: Запуск функции и проверка результатов
        result = calculate_premium(self.employee1.id)  # Передаем ID сотрудника для расчета премии
        self.assertEqual(result['employee'], 'Левина Яна Егоровна')
        self.assertGreater(result['total_income'], BASE_MROT)  # Проверяем, что доход больше МРОТ

        # Дополнительные проверки на основании данных и логики расчета
        result_employee2 = calculate_premium(self.employee2.id)
        self.assertEqual(result_employee2['employee'], 'Исаев Андрей Миронович')
        self.assertGreater(result_employee2['total_income'], BASE_MROT)

        result_employee3 = calculate_premium(self.employee3.id)
        self.assertEqual(result_employee3['employee'], 'Костина Алиса Романовна')
        self.assertGreater(result_employee3['total_income'], BASE_MROT)

    def test_no_deals(self):
        # Базовый МРОТ
        BASE_MROT = 15000

        # Шаг 3: Проверка функции с сотрудником, у которого нет сделок
        user_no_deals = User.objects.create_user(username="user4", password="password")
        employee_no_deals = Employee.objects.create(fio="Employee 4", user=user_no_deals, id_roles=self.role)
        result = calculate_premium(employee_no_deals.id)
        self.assertEqual(result['employee'], 'Employee 4')
        self.assertEqual(result['total_income'], BASE_MROT)  # Если нет сделок, премия должна быть равна МРОТ
 """