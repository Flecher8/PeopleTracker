using mobile.Model;
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
    public partial class DateTimePickerPage : ContentPage
    {
        public DateTimePickerViewModel ViewModel { get; set; }
        public DateTimePickerPage(int itemId, MainTextType mainTextType, ItemType itemType, RequestType requestType, bool isTimeNeeded = true)
        {
            InitializeComponent();
            ViewModel = new DateTimePickerViewModel(itemId, mainTextType, itemType, requestType, isTimeNeeded);
            BindingContext = ViewModel;

            ViewModel.DisplayInvalidTimeErorr = () =>
            {
                DisplayAlert("Time error", "Wrong time", "OK");
            };
        }
    }
}