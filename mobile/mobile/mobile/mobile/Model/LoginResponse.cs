using System;
using System.Collections.Generic;
using System.Text;

namespace mobile.Model
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public int UserId { get; set; }
        public string UserType { get; set; }
    }
}
