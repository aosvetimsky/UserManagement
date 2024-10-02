using System;

namespace UserManagement.Services.Api.Transport
{
    public class WeatherHistoryByMonth
    {
        public string Month { get; set; }
        public WeatherHistoryEntry[] HistoryEntries { get; set; }
    }

    public class WeatherHistoryEntry
    {
        public DateTimeOffset Date { get; set; }
        public int Temperature { get; set; }
    }

    public class WeatherHistoryResponse
    {
        public WeatherHistoryByMonth[] Entries { get; set; }
    }
}
