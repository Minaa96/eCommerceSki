using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entites.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtenstions
    {
        public static IQueryable<OrderDto> ProjectOrderToDto(this IQueryable<Order> query) 
        {
            return query
                .Select(order => new OrderDto
                {
                    
                    Id = order.Id,
                    BuyerId = order.BuyerId,
                    OrderDate = order.OrderDate,
                    ShippingAddress = order.ShippingAddress,
                    DeliveryFee = order.DeliveryFee,
                    Subtotal = order.Subtotal,
                    OrderStatus = order.OrderStatus.ToString(),
                    Total = order.GetTotal(),
                    OrderItems = order.OrderItems.Select(item => new OrderItemDto
                    {
                        ProizvodId = item.ItemOrdered.ProizvodId,
                        Ime = item.ItemOrdered.Ime,
                        PictureUrl = item.ItemOrdered.PictureUrl,
                        Cena = item.Cena,
                        Kolicina = item.Kolicina
                    }).ToList()
                }).AsNoTracking();


                
        }
    }
}