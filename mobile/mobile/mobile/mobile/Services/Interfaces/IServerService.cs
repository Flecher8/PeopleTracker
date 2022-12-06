using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace mobile.Services.Interfaces
{
    public interface IServerService
    {
        HttpClient SetUpHttp();
    }
}
