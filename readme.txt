How to launch
1) make sure you have postgres sql setuped (check appsettings.json)
2) run UserManagement.Services.Api
3) run web from solution or using ng serve

не знаю, насколько все надо было дотошно прорабатывать
1) по архитектуре можно было все выгрузить в сервисы UserService и т.д, делать там от них интерфейсы,
по идее каждый слой должен отдавать какую-то модель данных и контракты для работы с ними
2) можно было использовать ClaimBased Auth с Policy, их вроде и рекомендует писать МС
3) не писал тесты, т.к реально не много времени
4) на клиенте по идее надо реализовать какой LN/GL service для работы с локализацией и глобализацией
5) на клиенте надо добавить AuthGuad, чтобы защитить прямой переход по url на страницы, доступные только
для авторизированных юзеров
6) ну и какие-то мелочи - вроде confirm для удаления пользователя и тд

я бы учитывал, что это не release версия