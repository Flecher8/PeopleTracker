using mobile.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace mobile.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LoginPage : ContentPage
    {
        public LoginViewModel ViewModel { get; set; }
        public LoginPage()
        {
            InitializeComponent();
            ViewModel = new LoginViewModel();
            BindingContext = ViewModel;

            ViewModel.DisplayInvalidLoginErorr = () =>
            {
                DisplayAlert("Login error", "Wrong data", "OK");
            };
        }
    }
}