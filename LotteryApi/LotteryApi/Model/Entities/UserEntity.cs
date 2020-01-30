﻿using System.ComponentModel.DataAnnotations.Schema;

namespace LotteryApi.Model
{
    [Table("User")]
    public class UserEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Mail { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }
        public string Password { get; set; }
    }
}