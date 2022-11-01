using System;
using System.Collections.Generic;

namespace backend.Data
{
    public partial class Sensor
    {
        public int Id { get; set; }
        public int SmartDeviceId { get; set; }
        public int? LeftSensorId { get; set; }
        public int? RightSensorId { get; set; }
        public int LeftRoomId { get; set; }
        public int RightRoomId { get; set; }
        public int? PinNumber { get; set; }
        public string? Name { get; set; }

        public virtual Room? LeftRoom { get; set; } = null!;
        public virtual Room? RightRoom { get; set; } = null!;
    }
}
