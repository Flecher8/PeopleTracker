using mobile.Model;
using mobile.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace mobile.Services
{
    public class AccountService : ServerService, IAccountService
    {
        private const string LoginAddress = "Authentication/Login";

        public async Task<bool> LoginAsync(string login, string password)
        {
            LoginModel LoginModel = new LoginModel(login, password);

            StringContent content =
                new StringContent(
                JsonConvert.SerializeObject(LoginModel),
                Encoding.UTF8,
                "application/json"
                );

            HttpResponseMessage response = await HttpClient.PostAsync(LoginAddress, content);
            if (response.StatusCode != HttpStatusCode.OK)
            {
                return false;
            }

            HttpContent responseContent = response.Content;
            LoginResponse loginResponse = JsonConvert.DeserializeObject<LoginResponse>(await responseContent.ReadAsStringAsync());

            await PropertiesService.SetProperty("userToken", loginResponse.Token);
            await PropertiesService.SetProperty("userId", loginResponse.UserId);

            return response.StatusCode == HttpStatusCode.OK;
        }
    }
}
