using mobile.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace mobile.Services
{
    public class StatisticsService : ServerService
    {
        private const string VisitsOfPlacementByTimePeriod = "Placements/GetNumberOfVisitsPlacementByTimePeriod/placementId:";
        private const string VisitsOfRoomByTimePeriod = "Rooms/GetNumberOfVisitsRoomByTimePeriod/roomId:";

        private const string AvgVisitsOfRoomByTimePeriod = "Rooms/GetAvgVisitsRoomByTimePeriod/roomId:";
        private const string AvgVisitsOfPlacementByTimePeriod = "Placements/GetAvgVisitsPlacementByTimePeriod/placementId:";

        private const int DefaultValue = 0;

        public StatisticsService()
        {
            string AuthorizationUserToken = PropertiesService.GetProperty("userToken").ToString();
            HttpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + AuthorizationUserToken);
        }

        public async Task<string> GetVisits(int itemId, ItemType itemType, RequestType requestType, TimePeriod timePeriod)
        {
            if (requestType == RequestType.Default)
            {
                return (await GetDefaultVisits(itemId, itemType, timePeriod)).ToString();
            }
            if (requestType == RequestType.Avg)
            {
                return (await GetAvgVisits(itemId, itemType, timePeriod)).ToString();
            }
            return DefaultValue.ToString();
        }



        private async Task<int> GetDefaultVisits(int itemId, ItemType itemType, TimePeriod timePeriod)
        {
            if (itemType == ItemType.Room)
            {
                return await GetRoomVisits(itemId, timePeriod);
            }
            if (itemType == ItemType.Placement)
            {
                return await GetPlacementVisits(itemId, timePeriod);
            }
            return 0;
        }

        private async Task<double> GetAvgVisits(int itemId, ItemType itemType, TimePeriod timePeriod)
        {
            if (itemType == ItemType.Room)
            {
                return await GetAvgRoomVisits(itemId, timePeriod);
            }
            if (itemType == ItemType.Placement)
            {
                return await GetAvgPlacementVisits(itemId, timePeriod);
            }
            return 0;
        }



        private async Task<double> GetAvgRoomVisits(int itemId, TimePeriod timePeriod)
        {
            string result = JsonConvert.SerializeObject(timePeriod);

            StringContent content = new StringContent(result, Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await HttpClient.PostAsync(AvgVisitsOfRoomByTimePeriod + itemId, content);

            if (!Response.IsSuccessStatusCode)
            {
                return 0;
            }

            HttpContent ResponseContent = Response.Content;
            RoomVisitsResponce ResponceResult = JsonConvert.DeserializeObject<RoomVisitsResponce>(await ResponseContent.ReadAsStringAsync());

            return ResponceResult.value.result.count / ResponceResult.value.days;
        }

        private async Task<double> GetAvgPlacementVisits(int itemId, TimePeriod timePeriod)
        {
            string result = JsonConvert.SerializeObject(timePeriod);

            StringContent content = new StringContent(result, Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await HttpClient.PostAsync(AvgVisitsOfPlacementByTimePeriod + itemId, content);

            if (!Response.IsSuccessStatusCode)
            {
                return 0;
            }

            HttpContent ResponseContent = Response.Content;
            PlacementVisitsResponce ResponceResult = JsonConvert.DeserializeObject<PlacementVisitsResponce>(await ResponseContent.ReadAsStringAsync());

            return ResponceResult.value.result.count / ResponceResult.value.days;
        }



        private async Task<int> GetPlacementVisits(int itemId, TimePeriod timePeriod)
        {
            string result = JsonConvert.SerializeObject(timePeriod);

            StringContent content = new StringContent(result, Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await HttpClient.PostAsync(VisitsOfPlacementByTimePeriod + itemId, content);

            if (!Response.IsSuccessStatusCode)
            {
                return 0;
            }

            HttpContent ResponseContent = Response.Content;
            PlacementVisitsResponce ResponceResult = JsonConvert.DeserializeObject<PlacementVisitsResponce>(await ResponseContent.ReadAsStringAsync());

            return ResponceResult.value.result.count;
        }

        private async Task<int> GetRoomVisits(int itemId, TimePeriod timePeriod)
        {
            string result = JsonConvert.SerializeObject(timePeriod);

            StringContent content = new StringContent(result, Encoding.UTF8, "application/json");
            HttpResponseMessage Response = await HttpClient.PostAsync(VisitsOfRoomByTimePeriod + itemId, content);

            if (!Response.IsSuccessStatusCode)
            {
                return 0;
            }

            HttpContent ResponseContent = Response.Content;
            RoomVisitsResponce ResponceResult = JsonConvert.DeserializeObject<RoomVisitsResponce>(await ResponseContent.ReadAsStringAsync());

            return ResponceResult.value.result.count;
        }
    }
}
