using System;
using System.Collections.Generic;
using System.Text;

namespace mobile.Model
{
    public class SmartDevice
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PlacementId { get; set; }
        public int? NumberOfSensors { get; set; }

        public virtual Placement Placement { get; set; }
        public virtual User User { get; set; }
    }
}
