using Microsoft.AspNetCore.SignalR;
using CarRegistrationApi.Services;

namespace CarRegistrationApi.Hubs
{
    public class CarHub : Hub
    {
        private readonly CarDataService _carService;

        public CarHub(CarDataService carService)
        {
            _carService = carService;
        }

        public async Task CheckRegistrationStatus(string registrationNumber)
        {
            var isExpired = _carService.IsRegistrationExpired(registrationNumber);
            await Clients.All.SendAsync("RegistrationStatusUpdated", registrationNumber, isExpired);
        }
    }
}