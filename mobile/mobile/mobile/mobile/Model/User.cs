using System;
using System.Collections.Generic;
using System.Text;

namespace mobile.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string CompanyName { get; set; }
        public string Type { get; set; }
    }
}
