using System;
using System.Collections.Generic;

namespace backend.Data
{
    public partial class Room
    {
        public int Id { get; set; }
        public int PlacementId { get; set; }
        public string? Name { get; set; }
        public int NumberOfPeopleInRoom { get; set; }
        public bool IsExit { get; set; }

        public virtual Placement Placement { get; set; } = null!;
    }
}
