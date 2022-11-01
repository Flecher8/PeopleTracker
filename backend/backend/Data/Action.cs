using System;
using System.Collections.Generic;

namespace backend.Data
{
    public partial class Action
    {
        public int Id { get; set; }
        public int PlacementId { get; set; }
        public DateTime? DateTime { get; set; }
        public int? RoomOutId { get; set; }
        public int? RoomInId { get; set; }

        public virtual Placement? Placement { get; set; } = null!;
        public virtual Room? RoomIn { get; set; }
        public virtual Room? RoomOut { get; set; }
    }
}
