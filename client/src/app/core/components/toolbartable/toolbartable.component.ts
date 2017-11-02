import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
 
@Component({
    selector   : 'toolbar-table',
    templateUrl: './toolbartable.component.html',
    styleUrls  : ['./toolbartable.component.scss']
})
export class ToolBarTable implements OnInit
{
    @Input() buttons: any[];
    @Input() selecteds: any[];
    @Output() onAction = new EventEmitter<string>();

    constructor(
    )
    {

    }

    ngOnInit()
    {

    }

    toggleButton()
    {

    }

    runAction(action)
    {
      this.onAction.emit(action);
    }

    isActive(button)
    {
      if(button.onlyActive) {
        if(this.selecteds.length != button.onlyActive) return false;
      }
      if(button.atLeastOne) {
        if(this.selecteds.length < 1) return false;
      }

      return true;
    }

}
