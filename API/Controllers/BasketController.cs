using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entites;
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
            var basket = await RetriveBasket();

            if (basket == null) return NotFound();

            return MapBasketToDto(basket);
        }

       

        [HttpPost] //api/basket?proizvodId= &quantity=
        public async Task<ActionResult<BasketDto>> AddItemToBasket (int proizvodId, int quantity)
        {
            //get || create basket
            var basket = await RetriveBasket();
            if (basket == null) basket = CreateBasket(); //kreiranje basketa
            var proizvod = await _context.Proizvodi.FindAsync(proizvodId);
            if (proizvod == null) 
                return BadRequest(new ProblemDetails{Title = "Proizvod nije pronadjen!"}); 
            
            //add item
            basket.AddItem(proizvod, quantity);

            //save changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails{Title = "Problem sa cuvanjem proizvoda u korpi"});
        }

       

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int proizvodId, int quantity)
        {
            //get basket
          var basket = await RetriveBasket();

          if (basket == null) return NotFound();

            //remove item or reduce quantity
            basket.RemoveItem(proizvodId, quantity);

            //save changes
            var result = await _context.SaveChangesAsync() > 0;

            if (result )
            return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem pri brisanju proizvoda iz korpe"});
        }

        private async Task<Basket> RetriveBasket()
        {
            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Proizvod)
            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
             //cookies za sajt
             Response.Cookies.Append("buyerId", buyerId, cookieOptions);
             var basket = new Basket {BuyerId = buyerId};
             _context.Baskets.Add(basket);
             return basket;
        }

         private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto //mapping code
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProizvodId = item.ProizvodId,
                    Ime = item.Proizvod.Ime,
                    Cena = item.Proizvod.Cena,
                    PictureUrl = item.Proizvod.PictureUrl,
                    Tip = item.Proizvod.Tip,
                    Brend = item.Proizvod.Brend,
                    Kolicina = item.Quantity
                }).ToList()
            };
        }
    }

}