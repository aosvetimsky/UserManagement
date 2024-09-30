using System;
using System.Collections.Generic;
using System.Linq;

namespace UserManagement.Services.Extensions
{
    public static class IEnumerableExtensions
    {
        public static T Random<T>(this IEnumerable<T> collection)
        {
            if (collection == null || !collection.Any())
            {
                return default;
            }

            int randomIndex = System.Random.Shared.Next(collection.Count() - 1);
            return collection.ElementAt(randomIndex);
        }
    }
}
