using mobile.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace mobile.Services
{
    public class ServerService : IServerService
    {
        public const string ServerAddress = "https://lastpurplesled66.conveyor.cloud/api/";

        public PropertiesService PropertiesService { get; set; }

        public HttpClient HttpClient { get; set; }

        public ServerService()
        {
            HttpClient = SetUpHttp();
            PropertiesService = new PropertiesService();
        }

        public HttpClient SetUpHttp()
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(ServerAddress);
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            return client;
        }
    }
}
