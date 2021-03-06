namespace LotteryApi.Model.Draw
{
    public class DrawResult
    {
        public DrawnUser User { get; set; }

        public DrawTicket Ticket { get; set; }
        public int Id { get; set; }
        public DrawCharity Charity { get; set; }
        public int TotalParticipants { get; set; }
    }
}