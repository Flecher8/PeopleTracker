using System;
using System.Collections.Generic;
using System.Text;

namespace mobile.Model
{
    public class PlacementVisitsResponce
    {
        public object contentType { get; set; }
        public object serializerSettings { get; set; }
        public object statusCode { get; set; }
        public PlacementVisitsResult value { get; set; }
    }
}
