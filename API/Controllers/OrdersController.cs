using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entites;
using API.Entites.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
             return await _context.Orders
                .ProjectOrderToDto()
                .Where(x => x.BuyerId == User.Identity.Name)
                .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await _context.Orders
                .ProjectOrderToDto()
                .Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
            var basket = await _context.Baskets
                .RetriveBasketWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();

            if (basket == null) return BadRequest(new ProblemDetails{Title = "Ne moze pronaci korpu"});

            var items = new List<OrderItem>();

            foreach (var item in basket.Items)
            {
                var productItem = await _context.Proizvodi.FindAsync(item.ProizvodId);
                var itemOrdered = new ProductItemOrdered
                {
                    ProizvodId = productItem.Id,
                    Ime = productItem.Ime,
                    PictureUrl = productItem.PictureUrl
                };

                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Cena = productItem.Cena,
                    Kolicina = item.Quantity
                };
                items.Add(orderItem);
                productItem.KolicinaNaStanju -= item.Quantity;
            }

            var subtotal = items.Sum(item => item.Cena * item.Kolicina);
            var deliveryFee = subtotal > 15000 ? 0 : 1800;

            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = orderDto.ShippingAddress,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee,
              //  PaymentIntentId = basket.PaymentIntentId
            };

            _context.Orders.Add(order);
            _context.Baskets.Remove(basket);

            if (orderDto.SaveAddress)
            {
                var user = await _context.Users
                    .Include(a => a.Address)
                    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);

                var address = new UserAddress
                {
                    PunoIme = orderDto.ShippingAddress.PunoIme,
                    Addresa1 = orderDto.ShippingAddress.Addresa1,
                    Addresa2 = orderDto.ShippingAddress.Addresa2,
                    Grad = orderDto.ShippingAddress.Grad,
                    Opstina = orderDto.ShippingAddress.Opstina,
                    PostanskiBroj = orderDto.ShippingAddress.PostanskiBroj,
                    Drzava = orderDto.ShippingAddress.Drzava
                };
                user.Address = address;
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetOrder", new {id = order.Id}, order.Id);

            return BadRequest(new ProblemDetails{Title = "Problem sa kreiranjem porudzbine"});
        }
    }
}