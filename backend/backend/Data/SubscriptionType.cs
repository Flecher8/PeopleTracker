using System;
using System.Collections.Generic;

namespace backend.Data
{
    public partial class SubscriptionType
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int? NumberOfDays { get; set; }
        public decimal? Price { get; set; }
    }
}
