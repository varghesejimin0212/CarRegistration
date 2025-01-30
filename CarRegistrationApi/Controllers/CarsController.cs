using Microsoft.AspNetCore.Mvc;
using CarRegistrationApi.Services;
using CarRegistrationApi.Models;

namespace CarRegistrationApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly CarDataService _carService;

        public CarsController(CarDataService carService)
        {
            _carService = carService;
        }

        [HttpGet]
        public IActionResult GetCars([FromQuery] string? make)
        {
            return Ok(_carService.GetCars(make));
        }

        [HttpGet("registration-status/{registrationNumber}")]
        public IActionResult GetRegistrationStatus(string registrationNumber)
        {
            return Ok(new { 
                isExpired = _carService.IsRegistrationExpired(registrationNumber)
            });
        }
    }
}