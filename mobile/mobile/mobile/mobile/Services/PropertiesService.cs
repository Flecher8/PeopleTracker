using mobile.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace mobile.Services
{
    public class PropertiesService : IPropertiesService
    {
        public object GetProperty(string propertyName)
        {
            if (Xamarin.Forms.Application.Current.Properties.ContainsKey(propertyName))
            {
                return Xamarin.Forms.Application.Current.Properties[propertyName];
            }
            return null;
        }

        public async Task SetProperty(string propertyName, object propertyValue)
        {
            Xamarin.Forms.Application.Current.Properties[propertyName] = propertyValue;
            await Xamarin.Forms.Application.Current.SavePropertiesAsync();
        }
    }
}
