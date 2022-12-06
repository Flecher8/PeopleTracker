using mobile.Model;
using mobile.ViewModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace mobile.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class PlacementsPage : ContentPage
    {
        public PlacementsViewModel ViewModel { get; set; }
        public PlacementsPage(ObservableCollection<Placement> placements)
        {
            InitializeComponent();
            ViewModel = new PlacementsViewModel(placements, this.Navigation);
            BindingContext = ViewModel;

        }

        private void PlacementsVisits_Clicked(object sender, EventArgs e)
        {
            ViewModel.NavigateToViewVisitsOfPlacement(sender);
        }

        private void PlacementsAvgVisits_Clicked(object sender, EventArgs e)
        {
            ViewModel.NavigateToViewAvgVisitsOfPlacement(sender);
        }

        private void RoomsVisits_Clicked(object sender, EventArgs e)
        {
            ViewModel.NavigateToViewVisitsOfRoom(sender);
        }

        private void RoomsAvgVisits_Clicked(object sender, EventArgs e)
        {
            ViewModel.NavigateToViewAvgVisitsOfRoom(sender);
        }
    }
}