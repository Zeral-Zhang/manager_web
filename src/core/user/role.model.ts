export class Role {
    public code?: string;
    public name?: string;
    public describe?: string;
    public checked?: boolean;

    constructor(
        code?: string,
        name?: string,
        describe?: string,
        checked?: boolean
    ) {
        this.code = code ? code : null;
        this.name = name ? name : null;
        this.describe = describe ? describe : null;
        this.checked = checked ? checked : false;
    }
}
