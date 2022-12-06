using System;
using System.Collections.Generic;
using System.Text;

namespace mobile.Model
{
    public class LoginModel
    {
        public string Login { get; set; }
        public string Password { get; set; }

        public LoginModel(string login, string password)
        {
            Login = login;
            Password = password;
        }
    }
}
