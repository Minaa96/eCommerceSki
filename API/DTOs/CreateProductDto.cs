using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace API.DTOs
{
    public class CreateProductDto
    {
        [Required]
        public string Ime { get; set; }

        [Required]
        public string Opis { get; set; }

        [Required]
        public string Velicina { get; set; }
        [Required]
        public string Boja { get; set; }
        [Required]
        [Range(100, Double.PositiveInfinity)]
        public long Cena { get; set; }
        public string PictureUrl { get; set; }
        [Required]
        public string Tip { get; set; }
        [Required]
        public string Brend { get; set; }
        [Required]
        [Range(0, 200)]
        public int KolicinaNaStanju { get; set; }

    }
}
