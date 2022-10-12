using System;
using System.Collections.Generic;

namespace backend.Data
{
    public partial class Placement
    {
        public Placement()
        {
            Actions = new HashSet<Action>();
            Rooms = new HashSet<Room>();
            SmartDevices = new HashSet<SmartDevice>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Name { get; set; }
        public int NumberOfRooms { get; set; }

        public virtual User? User { get; set; } = null!;
        public virtual ICollection<Action>? Actions { get; set; }
        public virtual ICollection<Room>? Rooms { get; set; }
        public virtual ICollection<SmartDevice>? SmartDevices { get; set; }
    }
}
