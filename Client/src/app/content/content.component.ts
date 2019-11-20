import { Component, OnInit } from '@angular/core';
import { BackendService } from "../services/backend.service";
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.css'],
    providers: [BackendService, MessageService]
})
export class ContentComponent implements OnInit {

    user: any = {};
    gridUsers: Array<any> = [];
    cols: Array<any> = [];
    displayDialog: boolean;
    selectedUser: any;
    newUser: boolean;
    genders: Array<any>;

    constructor(private api: BackendService, private messageService: MessageService) {

    }

    ngOnInit() {

        this.genders = [
            { name: 'Male', code: 'M' },
            { name: 'Female', code: 'F' },
            { name: 'Other', code: 'O' }, ]

        this.getUsers();

    }
    //Error message for user
    showError(msg) {
        this.messageService.clear();
        this.messageService.add({
            severity: 'error',
            life:2000,
            summary: 'Error Message',
            detail: msg
        });
    }
    
    //Get data from server side
    getUsers() {
        var self = this;
        this.api.get().subscribe((d: any) => {
           
            self.gridUsers = [...d];
            var keys = Object.keys(d[0]);

            //Generate columns of data table
            if (self.cols.length == 0)
            {
                keys.forEach(function (key) {

                    if (key != 'id') {
                        self.cols.push({
                            field: key,
                            header: key
                        })
                    }
                })
            }
        }, (err: any) => {
            console.log("Get error: " + err);
        })
    }


    showDialogToAdd() {
        this.newUser = true;
        this.user = {};
        this.displayDialog = true;
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validData() {
        var msg = '';
        if (this.user) {
          
            if (this.user.passport == '') {
                msg += "Passport is required, "
            }
            else if (this.user.passport != '' && isNaN(this.user.passport)) {
                msg += "Passport must be number, ";
            }
            if (this.user.name == '') {
                msg += "Name is required, ";
            }

            if (this.user.birthDate == '') {
                msg += "Date of birth is required, ";
            }
            if (isNaN(this.user.phone))
                msg += "Phone must be number, ";
            if (this.user.mail != '' && !this.validateEmail(this.user.mail))
                msg += "Mail is not correct, ";
            
            var date = this.parseDate(this.user.birthDate);
            if (isNaN(Date.parse(date)))
                msg += "Date is not correct, ";
        }
        
        if (msg != '')
        {
            this.showError(msg);
            return false;
        }
        return true;
    }
    parseDate(str) {
        var m = str.match(/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/);
        return (m) ? new Date(m[3], m[2] - 1, m[1]) : null;
    }

    save() {
        var self = this;
        //Insert new data
        if (this.newUser) {
            if (this.validData()) {
                this.api.insert(this.user).subscribe((d: any) => {
                    self.getUsers();
                },
                    (err: any) => {
                        console.log("Insert error: " + err);
                    });
            }
        }

        else {//Update data
            if (this.validData()) {
                this.api.update(this.user).subscribe((d: any) => {
                    self.getUsers();
                },
                    (err: any) => {
                        console.log("Update error: " + err);
                    });
            }
        }
        this.user = null;
        this.displayDialog = false;
    }

    delete() {
        var self = this;
        this.api.delete(this.selectedUser.id).subscribe((output: any)=>{
            self.getUsers();

        }, (err: any) => {
            console.log("Delete error: " + err);
            })
        this.user = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newUser = false;
        this.user = this.cloneUser(event.data);
        this.displayDialog = true;
    }

    cloneUser(u: any) {
        let user = {};
        for (let prop in u) {
            user[prop] = u[prop];
        }
        return user;
    }

}
