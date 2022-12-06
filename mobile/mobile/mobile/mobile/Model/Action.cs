using System;
using System.Collections.Generic;
using System.Text;

namespace mobile.Model
{
    public partial class Action
    {
        public int PlacementId { get; set; }
        public DateTime? DateTime { get; set; }
        public int? RoomOutId { get; set; }
        public int? RoomInId { get; set; }
    }
}
