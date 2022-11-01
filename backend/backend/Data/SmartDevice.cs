using System;
using System.Collections.Generic;

namespace backend.Data
{
    public partial class SmartDevice
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PlacementId { get; set; }
        public int? NumberOfSensors { get; set; }

        public virtual Placement Placement { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
