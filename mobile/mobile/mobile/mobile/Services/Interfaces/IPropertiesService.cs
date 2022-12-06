using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace mobile.Services.Interfaces
{
    public interface IPropertiesService
    {
        object GetProperty(string propertyName);

        Task SetProperty(string propertyName, object propertyValue);
    }
}
