type TelegramUpdate = {
    update_id: number;
    message: TelegramMessage;
  };
  
  type TelegramMessage = {
    message_id: number;
    from: TelegramUser;
    chat: TelegramChat;
    date: number;
    text?: string;
  };
  
  type TelegramUser = {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  };
  
  type TelegramChat = {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    type: "private" | "group" | "supergroup" | "channel";
  };
  