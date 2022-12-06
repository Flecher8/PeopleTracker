using mobile.Helpers;
using mobile.Model;
using mobile.Services;
using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;

namespace mobile.ViewModels
{
    public class DateTimePickerViewModel : PropertyChangedImplementator
    {
        public System.Action DisplayInvalidTimeErorr = null;

        public StatisticsService StatisticsService { get; }

        public Command ShowCommand { get; }

        private TimeSpan startTime;
        public TimeSpan StartTime
        {
            get { return startTime; }
            set
            {
                startTime = value;
                OnPropertyChanged();
            }
        }

        private DateTime startDateTime;
        public DateTime StartDateTime
        {
            get { return startDateTime; }
            set
            {
                startDateTime = value;
                OnPropertyChanged();
            }
        }

        private TimeSpan endTime;
        public TimeSpan EndTime
        {
            get { return endTime; }
            set
            {
                endTime = value;
                OnPropertyChanged();
            }
        }

        private DateTime endDateTime;
        public DateTime EndDateTime
        {
            get { return endDateTime; }
            set
            {
                endDateTime = value;
                OnPropertyChanged();
            }
        }

        private string result;
        public string Result
        {
            get { return result; }
            set
            {
                result = value;
                OnPropertyChanged();
            }
        }

        private string mainText;
        public string MainText
        {
            get { return mainText; }
            private set { mainText = value; }
        }

        private ItemType ItemType;
        private int ItemId;

        private bool isTimeNeeded;
        public bool IsTimeNeeded
        {
            get { return isTimeNeeded; }
            private set { isTimeNeeded = value; }
        }

        private RequestType RequestType;

        public DateTimePickerViewModel(int itemId, MainTextType mainTextType, ItemType itemType, RequestType requestType, bool isTimeNeeded = true)
        {
            StatisticsService = new StatisticsService();
            ShowCommand = new Command(ShowAsync);
            ItemId = itemId;
            MainText = SetMainText(mainTextType);
            ItemType = itemType;
            IsTimeNeeded = isTimeNeeded;
            RequestType = requestType;
        }

        public async void ShowAsync()
        {
            TimePeriod timePeriod = CreateTimePeriod();
            if (IsTimeCorrect(timePeriod))
            {
                Result = await StatisticsService.GetVisits(ItemId, ItemType, RequestType, timePeriod);
            }
            else
            {
                DisplayInvalidTimeErorr();
            }
        }

        private TimePeriod CreateTimePeriod()
        {
            TimePeriod timePeriod = new TimePeriod();
            timePeriod.StartDateTime = startDateTime + startTime;
            timePeriod.EndDateTime = endDateTime + endTime;
            return timePeriod;
        }

        private bool IsTimeCorrect(TimePeriod timePeriod)
        {
            return timePeriod.StartDateTime < timePeriod.EndDateTime;
        }

        private string SetMainText(MainTextType mainTextType)
        {
            if (mainTextType == MainTextType.VisitsPlacement)
            {
                return "View visits of placement by time period";
            }
            if (mainTextType == MainTextType.VisitsRoom)
            {
                return "View visits of room by time period";
            }
            if (mainTextType == MainTextType.AvgVisitsPlacement)
            {
                return "View AVG visits of placement by time period";
            }
            if (mainTextType == MainTextType.AvgVisitsRoom)
            {
                return "View AVG visits of room by time period";
            }
            return "";
        }

    }
}
