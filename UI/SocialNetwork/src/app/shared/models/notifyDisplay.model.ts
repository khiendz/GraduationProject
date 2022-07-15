import { Profile } from "./profile.model";

export class NotifyDisplay
{
  id: string;
  value: any;
  name : string;
  icon : string;
  badge : string;
  _check : string;
}

export class NotifySelect
{
 notify: NotifyDisplay;
 profile: Profile;
}
