
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entites;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly TokenService _tokenService;
        private readonly StoreContext _context;
        private readonly UserManager<Korisnik> _userManager;
        public AccountController(UserManager<Korisnik> userManager, TokenService tokenService, StoreContext context)
        {
            _tokenService = tokenService;
            _context = context;
            _userManager = userManager;
        }
        
        [HttpPost("login")]
        public async Task<ActionResult<KorisnikDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByNameAsync(loginDto.UserName);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            /*return new KorisnikDto 
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user)
            };*/

            var userBasket = await RetriveBasket(loginDto.UserName);
            var anonBasket = await RetriveBasket(Request.Cookies["buyerId"]);

            if (anonBasket != null)
            {
                if (userBasket != null) _context.Baskets.Remove(userBasket);
                anonBasket.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }

            return new KorisnikDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = anonBasket != null ? anonBasket.MapBasketToDto() : userBasket?.MapBasketToDto()
            };
        }

         [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            var user = new Korisnik { UserName = registerDto.UserName, Email = registerDto.Email };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }

            await _userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }
        
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<KorisnikDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var userBasket = await RetriveBasket(User.Identity.Name);

            return new KorisnikDto
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = userBasket?.MapBasketToDto()
            };
        }
         private async Task<Basket> RetriveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }


            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Proizvod)
            .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

    }
}