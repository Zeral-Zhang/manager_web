export class Staff {
  public staffId: string;
  public staffCode: string;
  public staffIdcard: string;
  public staffMail: string;
  public staffTel: string;
  public staffPosition: string;
  public departId: string;
  public staffSex: string;
  public staffName: string;
  public operUser: string;
  public deleteStatus: number;
  public createTime: string;
}

export class RoleListModel {
  public roleId: string;
  public roleName: string;
  public isAll: number;
  public roleStatus: number;
  public addUser: string;
  public roleMemo: string;
  public checked: boolean;
}

export class RoleAndStaff {
  public roles: RoleListModel[];
  public staff: Staff;
}

export class TreeOfTree {
  public name: string;
  public id: number;
  public children: TreeOfTree[];
}
