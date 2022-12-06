using System;
using System.Collections.Generic;
using System.Text;

namespace mobile.Model
{
    public class ResponceVisitsAllRooms
    {
        public object contentType { get; set; }
        public object serializerSettings { get; set; }
        public object statusCode { get; set; }
        public List<RoomVisitsInfo> value { get; set; }
    }
}
