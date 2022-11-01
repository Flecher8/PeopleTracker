using System;
using System.Collections.Generic;

namespace backend.Data
{
    public partial class Payment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal? ReceivedMoneyAmount { get; set; }
        public string? Description { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
