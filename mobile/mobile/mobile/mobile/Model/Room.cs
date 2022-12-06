using System;
using System.Collections.Generic;
using System.Text;

namespace mobile.Model
{
    public class Room
    {
        public int Id { get; set; }
        public int PlacementId { get; set; }
        public string Name { get; set; }
        public int NumberOfPeopleInRoom { get; set; }
        public bool IsExit { get; set; }
    }
}
