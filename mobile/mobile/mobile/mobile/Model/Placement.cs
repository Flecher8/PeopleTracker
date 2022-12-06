using System;
using System.Collections.Generic;
using System.Text;

namespace mobile.Model
{
    public class Placement
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public int NumberOfRooms { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Action> Actions { get; set; }
        public virtual ICollection<Room> Rooms { get; set; }
        public virtual ICollection<SmartDevice> SmartDevices { get; set; }
    }
}
