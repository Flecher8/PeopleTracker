using mobile.Helpers;
using mobile.Services;
using mobile.Views;
using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;

namespace mobile.ViewModels
{
    public class LoginViewModel : PropertyChangedImplementator
    {
        private AccountService accountService;

        public PlacementService PlacementService { get; private set; }

        public Action DisplayInvalidLoginErorr = null;

        private string login;
        public string Login
        {
            get { return login; }
            set
            {
                login = value;
                OnPropertyChanged();
            }
        }

        private string password;
        public string Password
        {
            get { return password; }
            set
            {
                password = value;
                OnPropertyChanged();
            }
        }

        public Command LoginCommand { get; }

        public LoginViewModel()
        {
            accountService = new AccountService();
            
            LoginCommand = new Command(LoginAsync);
        }

        public async void LoginAsync()
        {
            if (!await accountService.LoginAsync(Login, Password))
            {
                DisplayInvalidLoginErorr();
                return;
            }
            PlacementService = new PlacementService();
            App.Current.MainPage = new NavigationPage(new PlacementsPage(await PlacementService.GetUserPlacements()));
        }
    }
}
