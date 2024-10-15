export interface Channel {
    _id: string;
    name: string;
  }
  
  export interface Group {
    _id: string;
    name: string;
    channels: Channel[];
  }
  