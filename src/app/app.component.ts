import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import {
  PdfViewerComponent, TextFieldSettings, RadioButtonFieldSettings, InitialFieldSettings, CheckBoxFieldSettings, SignatureFieldSettings, LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService,
  ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, LoadEventArgs, ValidateFormFieldsArgs, FormDesignerService
} from '@syncfusion/ej2-angular-pdfviewer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:max-line-length
 providers: [LinkAnnotationService, BookmarkViewService, MagnificationService, ThumbnailViewService, ToolbarService, NavigationService, TextSearchService, TextSelectionService, PrintService, AnnotationService, FormFieldsService, FormDesignerService]
})

export class AppComponent implements OnInit {
  title = 'poc-angular';

    @ViewChild('pdfviewer')
  public pdfviewerControl!: PdfViewerComponent;
    public service: string = 'https://services.syncfusion.com/angular/production/api/pdfviewer';
    public document: string = '';
    ngOnInit(): void {
        // ngOnInit function
    }
public validateFormFields(e: ValidateFormFieldsArgs): void {
    let errorMessage : string = "Required Field(s): ";
    let forms: any = this.pdfviewerControl.formFieldCollections;
    let flag: boolean = false;
    let radioGroupName: string = "";
    for (var i = 0; i < forms.length; i++) {
        let text: string = "";
        if (forms[i].isRequired == true)
        {
            if (forms[i].type.toString() == "Checkbox" && forms[i].isChecked == false) {
                text = forms[i].name;
            }
            else if (forms[i].type == "RadioButton" && flag == false) {
                radioGroupName = forms[i].name;
                if(forms[i].isSelected == true)
                    flag = true;
            }
            else if (forms[i].type.toString() != "Checkbox" && forms[i].type != "RadioButton" &&  forms[i].value == ""){
                text = forms[i].name;
            }
            if(text != "")
            {                    
                if (errorMessage == "Required Field(s): ") {
                    errorMessage += text;
                }
                else {
                    errorMessage += ", " + text;
                }
            }
        }
    }
    if(!flag && radioGroupName != "")
    {
        if(errorMessage == "Required Field(s): ")
            errorMessage += radioGroupName;
        else
            errorMessage += ", " + radioGroupName;
    }
    if (errorMessage != "Required Field(s): ") {
        this.pdfviewerControl.showNotificationPopup(errorMessage);
    }
}
     
}
