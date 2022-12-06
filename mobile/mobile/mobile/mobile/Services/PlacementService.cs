using mobile.Model;
using mobile.Services.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace mobile.Services
{
    public class PlacementService : ServerService
    {
        private const string PlacementsAddress = "Placements/userId:";
        private const string RoomsAddress = "Rooms/GetRoomsByPlacement/placementId:";
        private const string VisitsInRoomsByPlacementAddress = "Rooms/GetVisitsInRoomsByPlacement/placementId:";

        private const int minYear = 2022;
        private const int minMonth = 1;
        private const int minDay = 1;

        public PlacementService()
        {
            string AuthorizationUserToken = PropertiesService.GetProperty("userToken").ToString();
            HttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + AuthorizationUserToken);
        }

        public async Task<ObservableCollection<Placement>> GetUserPlacements()
        {
            string UserId = PropertiesService.GetProperty("userId").ToString();
            HttpResponseMessage Response = await HttpClient.GetAsync(PlacementsAddress + UserId);

            if (!Response.IsSuccessStatusCode)
            {
                return null;
            }

            HttpContent ResponseContent = Response.Content;
            ObservableCollection<Placement> Placements = JsonConvert.DeserializeObject<ObservableCollection<Placement>>(await ResponseContent.ReadAsStringAsync());

            Placements = await SetRoomsIntoPlacements(Placements);

            return Placements;
        }

        private async Task<ObservableCollection<Placement>> SetRoomsIntoPlacements(ObservableCollection<Placement> placements)
        {
            foreach (Placement placement in placements)
            {
                placement.Rooms = await LoadRooms(placement.Id);
            }
            return placements;
        }

        private async Task<ICollection<Room>> LoadRooms(int placementId)
        {
            HttpResponseMessage response = await HttpClient.GetAsync(RoomsAddress + placementId);

            HttpContent responseContent = response.Content;

            ICollection<Room> Rooms = JsonConvert.DeserializeObject<ICollection<Room>>(await responseContent.ReadAsStringAsync());

            return Rooms;
        }
    }
}
