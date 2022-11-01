using System;
using System.Collections.Generic;

namespace backend.Data
{
    public partial class Room
    {
        public Room()
        {
            ActionRoomIns = new HashSet<Action>();
            ActionRoomOuts = new HashSet<Action>();
            SensorLeftRooms = new HashSet<Sensor>();
            SensorRightRooms = new HashSet<Sensor>();
        }

        public int Id { get; set; }
        public int PlacementId { get; set; }
        public string? Name { get; set; }
        public int NumberOfPeopleInRoom { get; set; }
        public bool IsExit { get; set; }

        public virtual Placement? Placement { get; set; } = null!;
        public virtual ICollection<Action>? ActionRoomIns { get; set; }
        public virtual ICollection<Action>? ActionRoomOuts { get; set; }
        public virtual ICollection<Sensor>? SensorLeftRooms { get; set; }
        public virtual ICollection<Sensor>? SensorRightRooms { get; set; }
    }
}
