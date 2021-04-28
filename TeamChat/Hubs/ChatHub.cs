namespace TeamChat.Hubs
{
    using Microsoft.AspNetCore.SignalR;
    using System.Threading.Tasks;
    using System;
    using System.Collections.Generic;

    public class ChatHub : Hub
    {
        private List<User> Users = new List<User>();

        public override Task OnConnectedAsync()
        {
            UserHandler.ConnectedIds.Add(Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string user, string message)
        {
            if (message.Substring(0,1) == "/")
            {
                if(message.IndexOf(" ") > 0)
                {
                    string command = message.Substring(1, message.IndexOf(" ")).ToLower();
                    string parameters = message.Substring(message.IndexOf(" ") + 1);

                    switch (command)
                    {
                        case "help":
                            await Clients.Caller.SendAsync("ReceiveMessage", "<span class=\"sg\">[" + DateTime.Now.ToString("h:mm:ss") + "]</span><span class=\"sg\">[Server]</span><span class=\"sb\">  The following commands are available on this server:</span>");
                            await Clients.Caller.SendAsync("ReceiveMessage", "<span class=\"sg\">[" + DateTime.Now.ToString("h:mm:ss") + "]</span><span class=\"sg\">[Server]</span><span class=\"sb\">      help : display help for the commands.</span>");
                            break;
                    }
                }
                else
                {
                    await Clients.Caller.SendAsync("ReceiveMessage", "<span class=\"sg\">[" + DateTime.Now.ToString("h:mm:ss") + "]</span><span class=\"sg\">[" + user + "]</span><span class=\"sg\">  " + message + "</span>");
                    await Clients.Caller.SendAsync("ReceiveMessage", "<span class=\"sg\">[" + DateTime.Now.ToString("h:mm:ss") + "]</span><span class=\"sg\">[Server]</span><span class=\"sb\">  Unknown Command.</span>");
                }
            }
            else
            {
                await Clients.Others.SendAsync("ReceiveMessage", "<span class=\"sg\">[" + DateTime.Now.ToString("h:mm:ss") + "]</span><span class=\"sg\">[" + user + "]</span><span class=\"sb\">  " + message + "</span>");
                await Clients.Caller.SendAsync("ReceiveMessage", "<span class=\"sg\">[" + DateTime.Now.ToString("h:mm:ss") + "]</span><span class=\"sg\">[" + user + "]</span><span class=\"sg\">  " + message + "</span>");
            }
        }

        public async Task SendHello(string username)
        {
            Users.Add(new User(Context.ConnectionId, username));
            await Clients.Caller.SendAsync("ReceiveMessage", "<span class=\"sg\">[" + DateTime.Now.ToString("h:mm:ss") + "]</span><span class=\"sg\">[Server]</span><span class=\"sb\">  Hi " + username + ", welcome to TeamChat.</span>");
            await Clients.Caller.SendAsync("ReceiveMessage", "<span class=\"sg\">[" + DateTime.Now.ToString("h:mm:ss") + "]</span><span class=\"sg\">[Server]</span><span class=\"sb\">  There are currently " + UserHandler.ConnectedIds.Count + " connections to this server.</span>");
        }
    }

    public static class UserHandler
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>();
    }
}
