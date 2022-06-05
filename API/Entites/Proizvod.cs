using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entites
{
    public class Proizvod
    {
        public int Id { get; set; }
        public string Ime { get; set; }
        public string Opis { get; set; }
        public string Velicina { get; set; }
        public string Boja { get; set; }
        public long Cena { get; set; }
        public string PictureUrl { get; set; }
        public string Tip { get; set; }
        public string Brend { get; set; }
        public string KolicinaNaStanju { get; set; }


        
    }
}