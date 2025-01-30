using CarRegistrationApi.Models;

namespace CarRegistrationApi.Services
{
    public class CarDataService
    {
        private static List<Car> _cars = new List<Car>
        {
            new Car 
            { 
                Id = 1, 
                Make = "Toyota", 
                Model = "Camry", 
                RegistrationNumber = "ABC123",
                RegistrationExpiryDate = DateTime.Now.AddMonths(3)
            },
            new Car 
            { 
                Id = 2, 
                Make = "Honda", 
                Model = "Civic", 
                RegistrationNumber = "XYZ789",
                RegistrationExpiryDate = DateTime.Now.AddDays(-10)
            }
        };

        public IEnumerable<Car> GetCars(string? make = null)
        {
            return make == null 
                ? _cars 
                : _cars.Where(c => c.Make.ToLower() == make.ToLower());
        }

        public bool IsRegistrationExpired(string registrationNumber)
        {
            var car = _cars.FirstOrDefault(c => c.RegistrationNumber == registrationNumber);
            return car?.RegistrationExpiryDate < DateTime.Now;
        }
    }
}