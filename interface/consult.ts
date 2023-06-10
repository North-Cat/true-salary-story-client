interface IConsultMessage {
  sender: string;
  content: string;
  createDate: Date;
}

export interface IConsult {
  _id: string;
  sender: string;
  receiver: string;
  messages: IConsultMessage[];
  activePost: {
    companyName: string;
    title: string;
    postId: string;
  };
  updateDate: Date;
  isRead: boolean;
}
