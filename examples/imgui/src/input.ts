import { ImFont } from "./imgui";
import {ImGui} from "./index";

export enum EType
{
    eInput,
    eMultiLine, 
    ePassword,
    eMax,
}

export class Input
{
    constructor(type:EType, textCol:string, textBg:string)
    {
        let input;
        switch(type)    {
        case EType.eInput:
            input=document.createElement('input');
            input.type='text';
            break;
        case EType.eMultiLine:
            input=document.createElement('textarea');
            input.style.resize='none';
            break;
        case EType.ePassword:
            input=document.createElement('input');
            input.type='password';
            break;
        }
        input.style.position='fixed';
        input.style.top=0 + 'px';
        input.style.left=0 + 'px';
        input.style.borderWidth='0';
        input.style.borderStyle='none';
        input.style.zIndex='999';
        input.style.backgroundColor=textBg;
        input.style.color=textCol;
        input.value="123";

        input.addEventListener('blur', (e)=>{this.onLostFocus(e)})

        document.body.appendChild(input);
        this._dom_input=input;
        this.setVisible(false);
    }

    public on_input: ((this: Input, text: string) => any) | null; 
    public on_visible: ((this: Input, visible: boolean) => any) | null; 

    private onLostFocus(e:Event)
    {
        if(this.on_input)   {
            this.on_input(this._dom_input.value);
        }
        this.setVisible(false);        
    }
    public isMe(id:ImGui.ImGuiID):boolean {
        return this.isVisible && this._id==id;
    }

    public get Text():string {
        return this._dom_input.value;
    }
    public setRect(x:number, y:number, w:number, h:number)
    {
        let input=this._dom_input;
        input.style.left=x + 'px';
        input.style.top=y + 'px';
        input.style.width=w -5 + 'px';
        input.style.height=h -5 + 'px';
    }
    public setText(text:string, id:ImGui.ImGuiID, font:ImFont)
    {
        this._id=id;
        let input=this._dom_input;
        input.style.font=ImGui.Font_toString(font);
        input.value=text;
        this.setVisible(true);
    }
    public setVisible(b:boolean)
    {
        let input=this._dom_input;
        if(b) {
            input.style.display='inline-block';
            input.focus();
        }else {
            input.style.display='none';
        }
        this.isVisible=b;
        if(this.on_visible) {
            this.on_visible(b);
        }
    }

    public _dom_input:HTMLInputElement|HTMLTextAreaElement;
    private _id:ImGui.ImGuiID;
    public isVisible:boolean=false;
}

export let dom_input:any={}

export let GetInput = (type:EType, textColor:string, textBgColor:string) => :Input
{
    let inp=dom_input[type];
    if(!inp)    {
        inp=new Input(type, textColor, textBgColor);
        dom_input[type]=inp;
    }
    return inp;
}

