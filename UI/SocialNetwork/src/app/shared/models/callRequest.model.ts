import { Profile } from "./profile.model";

export class CallRequest
{
  fromUser: Profile;
  toUser : string;
  roomName : string;
}
