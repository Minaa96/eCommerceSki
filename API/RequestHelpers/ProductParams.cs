using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class ProductParams : PaginationParams
    {
        public string OrderBy { get; set; }
        public string searchTerm { get; set; }
        public string Tip { get; set; }
        public string Brend { get; set; }
    }
}