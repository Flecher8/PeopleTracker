using mobile.Helpers;
using mobile.Model;
using mobile.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using Xamarin.Forms;

namespace mobile.ViewModels
{
    public class PlacementsViewModel : PropertyChangedImplementator
    {
        private const bool IsTimeNeeded = true;

        public ObservableCollection<Placement> Placements { get; set; }

        public ObservableCollection<Grouping<string, Room>> PlacementsGroups { get; private set; }

        public PlacementService PlacementService { get; }

        public string MostVisitedRooms { get; }

        public INavigation Navigation { get; set; }

        public PlacementsViewModel(ObservableCollection<Placement> placements, INavigation navigation)
        {
            PlacementService = new PlacementService();
            Placements = placements;
            Navigation = navigation;
            LoadGroupOfPlacements();
        }

        private void LoadGroupOfPlacements()
        {
            PlacementsGroups = new ObservableCollection<Grouping<string, Room>>();
            foreach (Placement placement in Placements)
            {
                PlacementsGroups.Add(new Grouping<string, Room>(placement.Name, placement.Rooms.AsEnumerable()));
            }
        }

        public async void NavigateToViewVisitsOfPlacement(object sender)
        {
            int ItemId = GetPlacementByName(GetPlacementNameByClickedButton(sender));
            await Navigation.PushAsync(new DateTimePickerPage(ItemId, MainTextType.VisitsPlacement, ItemType.Placement, RequestType.Default, IsTimeNeeded));
        }

        public async void NavigateToViewAvgVisitsOfPlacement(object sender)
        {
            int ItemId = GetPlacementByName(GetPlacementNameByClickedButton(sender));
            await Navigation.PushAsync(new DateTimePickerPage(ItemId, MainTextType.AvgVisitsPlacement, ItemType.Placement, RequestType.Avg, !IsTimeNeeded));
        }

        public async void NavigateToViewVisitsOfRoom(object sender)
        {
            int ItemId = GetRoomIdByClickedButton(sender);
            await Navigation.PushAsync(new DateTimePickerPage(ItemId, MainTextType.VisitsRoom, ItemType.Room, RequestType.Default, IsTimeNeeded));
        }

        public async void NavigateToViewAvgVisitsOfRoom(object sender)
        {
            int ItemId = GetRoomIdByClickedButton(sender);
            await Navigation.PushAsync(new DateTimePickerPage(ItemId, MainTextType.AvgVisitsRoom, ItemType.Room, RequestType.Avg, !IsTimeNeeded));
        }

        private int GetPlacementByName(string placementName)
        {
            foreach (Placement placement in Placements)
            {
                if (placement.Name == placementName)
                {
                    return placement.Id;
                }
            }
            return 0;
        }

        private string GetPlacementNameByClickedButton(object sender)
        {
            Button button = sender as Button;
            ViewCell viewCell = button.Parent.Parent.Parent as ViewCell;
            Grouping<string, Room> grouping = (Grouping<string, Room>)viewCell.BindingContext;
            return grouping.Key;
        }

        private int GetRoomIdByClickedButton(object sender)
        {
            Button button = sender as Button;
            ViewCell viewCell = button.Parent.Parent.Parent as ViewCell;
            Room gr = (Room)viewCell.BindingContext;
            return gr.Id;
        }
    }
}
