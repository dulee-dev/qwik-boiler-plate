import { tags } from 'typia';

export type Uuid = string & tags.Format<'uuid'>;
export type Url = string & tags.MaxLength<2048>;
export type NonNegativeNumber = number & tags.Minimum<0>;
export type Email = string &
  tags.Pattern<`^[a-z0-9!#$%&'*+\/=?^\\_\`{|}~\\-]+(?:\\.[a-z0-9!#$%&'*+\/=?^\\_\`{|}~\\-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$`> &
  tags.MaxLength<256>;
export type IsoDate = string &
  tags.Pattern<`^2[0-9]{3}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\.[0-9]{3}Z$`>;
export type Length<T extends number> = tags.MaxLength<T> & tags.MinLength<T>;
