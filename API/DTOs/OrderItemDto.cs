using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderItemDto
    {
         public int ProizvodId { get; set; }
        public string Ime { get; set; }
        public string PictureUrl { get; set; }
        public long Cena { get; set; }
        public int Kolicina { get; set; }
    }
}