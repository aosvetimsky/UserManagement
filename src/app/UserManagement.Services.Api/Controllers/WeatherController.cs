using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using UserManagement.Services.Api.Transport;
using UserManagement.Services.Contracts;

namespace UserManagement.Services.Api.Controllers
{
    [Route("weather")]
    public class WeatherController : ApiControllerBase
    {
        private readonly IWeatherHistoryService _weatherHistoryService;

        public WeatherController(IWeatherHistoryService weatherHistoryService)
        {
            _weatherHistoryService = weatherHistoryService;
        }

        [HttpGet]
        [Route("weather-history/{year}")]
        public async Task<WeatherHistoryResponse> Get(int year)
        {
            // generating some fake data
            var historyEntries = Enumerable.Range(1, 12).Select(month => new WeatherHistoryByMonth
            {
                // there should be some external real weather service api call
                Month = DateTimeFormatInfo.CurrentInfo.GetMonthName(month),
                HistoryEntries = new List<WeatherHistoryEntry>(Enumerable.Range(1, 5).Select(day => new WeatherHistoryEntry
                {
                    Date = new DateTime(year, month, day),
                    Temperature = new Random().Next(-20, 35)
                })).ToArray()
            });

            return new WeatherHistoryResponse
            {
                Entries = historyEntries.ToArray()
            };
        }
    }
}
