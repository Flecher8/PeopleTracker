using System;
using System.Collections.Generic;

namespace backend.Data
{
    public partial class User
    {
        public User()
        {
            Payments = new HashSet<Payment>();
            Placements = new HashSet<Placement>();
            SmartDevices = new HashSet<SmartDevice>();
            UsersSubscriptions = new HashSet<UsersSubscription>();
        }

        public int Id { get; set; }
        public string Login { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Email { get; set; }
        public string? CompanyName { get; set; }
        public string Type { get; set; } = null!;

        public virtual ICollection<Payment>? Payments { get; set; }
        public virtual ICollection<Placement>? Placements { get; set; }
        public virtual ICollection<SmartDevice>? SmartDevices { get; set; }
        public virtual ICollection<UsersSubscription>? UsersSubscriptions { get; set; }
    }
}
