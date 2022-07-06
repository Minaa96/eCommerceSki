using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entites;
using API.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;

        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetriveBasket(GetBuyerId());

            if (basket == null) return NotFound();

            return basket.MapBasketToDto();
        }

       

        [HttpPost] //api/basket?proizvodId= &quantity=
        public async Task<ActionResult<BasketDto>> AddItemToBasket (int proizvodId, int quantity)
        {
            //get || create basket
            var basket = await RetriveBasket(GetBuyerId());
            if (basket == null) basket = CreateBasket(); //kreiranje basketa
            var proizvod = await _context.Proizvodi.FindAsync(proizvodId);
            if (proizvod == null) 
                return BadRequest(new ProblemDetails{Title = "Proizvod nije pronadjen!"}); 
            
            //add item
            basket.AddItem(proizvod, quantity);

            //save changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

            return BadRequest(new ProblemDetails{Title = "Problem sa cuvanjem proizvoda u korpi"});
        }

       

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int proizvodId, int quantity)
        {
            //get basket
          var basket = await RetriveBasket(GetBuyerId());

          if (basket == null) return NotFound();

            //remove item or reduce quantity
            basket.RemoveItem(proizvodId, quantity);

            //save changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result )
            return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem pri brisanju proizvoda iz korpe"});
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

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

        private Basket CreateBasket()
        {
            
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId)) {
                buyerId = Guid.NewGuid().ToString();

                var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
             //cookies za sajt
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }
            
             var basket = new Basket {BuyerId = buyerId};
             _context.Baskets.Add(basket);
             return basket;
        }

       
    }

}