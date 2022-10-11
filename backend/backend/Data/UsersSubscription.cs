using System;
using System.Collections.Generic;

namespace backend.Data
{
    public partial class UsersSubscription
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime? EndDateTime { get; set; }

        public virtual User? User { get; set; } = null!;
    }
}
